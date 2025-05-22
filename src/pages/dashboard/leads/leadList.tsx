import { useState, useMemo } from "react";
import {
  Container,
  Button,
  Table,
  Pagination,
  Spinner,
  Form,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/route-paths.config";
import { useAllLeads, useDeleteLead } from "@/hooks/useLeads";
import Swal from "sweetalert2";

const LeadList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [referralFilter, setReferralFilter] = useState("All"); // <- NEW
  const leadsPerPage = 10;

  const { data: leads = [], isLoading } = useAllLeads();
  const { mutate: deleteLead } = useDeleteLead();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this lead?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        deleteLead(id);
        Swal.fire("Deleted!", "The lead has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the lead.", "error");
      }
    }
  };

  const enrichedLeads = useMemo(() => {
  const idToName: Record<string, string> = {};
  const referralCount: Record<string, number> = {};

    leads.forEach((lead) => {
      const fullName = `${lead.personal?.firstName || ""} ${lead.personal?.lastName || ""}`.trim();
      idToName[lead._id] = fullName;
      referralCount[lead._id] = 0;
    });

    leads.forEach((lead) => {
      if (lead.referredBy && referralCount[lead.referredBy] !== undefined) {
        referralCount[lead.referredBy]++;
      }
    });

    return leads.map((lead) => {
      const referredByName = lead.referredBy
        ? idToName[lead.referredBy] || "Unknown"
        : "Direct";
      const affiliateCount = referralCount[lead._id] || 0;
      return { ...lead, referredByName, affiliateCount };
    });
  }, [leads]);

  // 🔍 Apply search and referral filter
  const filteredLeads = useMemo(() => {
    return enrichedLeads.filter((lead) => {
      const name = `${lead.personal?.firstName || ""} ${lead.personal?.lastName || ""}`.toLowerCase();
      const email = lead.contact?.email?.toLowerCase() || "";
      const phone = lead.contact?.phone || "";
      const province = lead.personal?.province?.toLowerCase() || "";

      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm.toLowerCase()) ||
        province.includes(searchTerm.toLowerCase());

      const matchesFilter =
        referralFilter === "All"
          ? true
          : referralFilter === "Direct"
          ? !lead.referredBy
          : !!lead.referredBy;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, referralFilter, enrichedLeads]);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  return (
    <div className="p-5 shadow-lg rounded bg-light container-fluid">
      <h2 className="mb-4 text-center fw-bold">📋 All Insurance Leads</h2>

      <Row className="mb-3">
        <Col md={6}>
        <h4>Search</h4>
          <Form.Control
            type="text"
            placeholder="Search by name, email, phone or province"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
          />
        </Col>
        <Col md={3}>
        <h4>Filter</h4>
          <Form.Select
            value={referralFilter}
            onChange={(e) => {
              setReferralFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Leads</option>
            <option value="Direct">Direct Leads</option>
            <option value="Referred">Referred Leads</option>
          </Form.Select>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : leads.length > 0 ? (
        <>
          <Table striped bordered hover responsive className="shadow-sm rounded">
            <thead className="table-dark text-center">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
                {/* <th>Province</th> */}
                <th>Referred By</th>
                <th>Affiliate Count</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white">
              {currentLeads.map((lead, index) => (
                <tr key={lead._id} className="align-middle">
                  <td>{indexOfFirstLead + index + 1}</td>
                  <td>{lead.personal?.firstName} {lead.personal?.lastName}</td>
                  <td>{lead.contact?.email}</td>
                  <td>{lead.contact?.phone}</td>
                  <td>{lead.vehicle?.make} {lead.vehicle?.model}</td>
                  {/* <td>{lead.personal?.province}</td> */}
                  <td>
                    <Badge bg={lead.referredBy ? "info" : "success"}>
                      {lead.referredBy ? `Referred by ${lead.referredByName}` : "Direct"}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={lead.affiliateCount > 0 ? "primary" : "secondary"}>
                      {lead.affiliateCount}
                    </Badge>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="m-1"
                      onClick={() => navigate((ROUTES.PRIVATE.LEAD_PREVIEW as (id: string) => string)(lead._id))}
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="m-1"
                      onClick={() => handleDelete(lead._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      ) : (
        <p className="text-center">No leads found.</p>
      )}
    </div>
  );
};

export default LeadList;
