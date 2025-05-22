import {
  Container,
  Card,
  Table,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLeadById } from "@/hooks/useLeads";
import { useParams } from "react-router-dom";

const LeadPreview = () => {
  const { id } = useParams();
  const { data: quoteData, isLoading, isError } = useLeadById(String(id));
  console.log("data ", quoteData);

  const safe = (val: any) => (val ? val : "");

  if (isLoading) {
    return (
      <Container className="p-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (isError || !quoteData) {
    return (
      <Container className="p-5 text-center">
        Failed to load quote data.
      </Container>
    );
  }

  const downloadInvoice = async () => {
    const input = document.getElementById("quote-preview");
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`insurance-quote-${quoteData._id}.pdf`);
  };

  const personal = quoteData.personal || {};
  const contact = quoteData.contact || {};

  return (
    <Container className="p-5 shadow-lg bg-white rounded">
      <h2 className="mb-4 text-center fw-bold">🚗 Insurance Quote Preview</h2>
      <Card className="p-4 shadow-sm" id="quote-preview">
        {/* Top Summary */}
        <Row className="mb-4">
          <div className="text-left m-3">
            {quoteData.referredBy ? (
              <span className="badge bg-primary blink">By Referral</span>
            ) : (
              <span className="badge bg-success blink">
                Direct Submission
              </span>
            )}
          </div>
          <Col md={6}>
            <h5>Contact Details</h5>
            <p>
              <strong>Name:</strong> {safe(personal.firstName)}{" "}
              {safe(personal.lastName)} <br />
              {personal.preferredFirstName && personal.preferredLastName && (
                <>
                  <strong>Preferred Name:</strong>{" "}
                  {safe(personal.preferredFirstName)}{" "}
                  {safe(personal.preferredLastName)} <br />
                </>
              )}
              <strong>Phone:</strong> {safe(contact.phone)} <br />
              <strong>Email:</strong> {safe(contact.email)}
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>
              <strong>Quote ID:</strong> {quoteData._id} <br />
              <strong>Created At:</strong>{" "}
              {new Date(quoteData.createdAt).toLocaleString()} <br />
              <strong>Coverage Start:</strong>{" "}
              {new Date(quoteData.coverageStart).toLocaleDateString()}
            </p>
          </Col>
        </Row>

        {/* Primary Driver Info Section */}
        <h5 className="mt-4">👤 Primary Driver Info</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{safe(personal.firstName)}</td>
              <td>Last Name</td>
              <td>{safe(personal.lastName)}</td>
            </tr>
            {personal.preferredFirstName || personal.preferredLastName ? (
              <tr>
                <td>Preferred First Name</td>
                <td>{safe(personal.preferredFirstName)}</td>
                <td>Preferred Last Name</td>
                <td>{safe(personal.preferredLastName)}</td>
              </tr>
            ) : null}
            <tr>
              <td>Date of Birth</td>
              <td>
                {safe(personal.dob?.day)}/{safe(personal.dob?.month)}/
                {safe(personal.dob?.year)}
              </td>
              <td>Gender</td>
              <td>{safe(personal.gender)}</td>
            </tr>
            <tr>
              <td>Marital Status</td>
              <td>{safe(personal.maritalStatus)}</td>
              <td>Province</td>
              <td>{safe(personal.province)}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{safe(personal.city)}</td>
              <td>Postal Code</td>
              <td>{safe(personal.pincode)}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <strong>Address:</strong> {safe(personal.address)}
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Vehicle Info */}
        <h5 className="mt-4">🚗 Vehicle Info</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td>Make</td>
              <td>{safe(quoteData.vehicle?.make)}</td>
              <td>Model</td>
              <td>{safe(quoteData.vehicle?.model)}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{safe(quoteData.vehicle?.year)}</td>
              <td>Condition</td>
              <td>{safe(quoteData.vehicle?.vehicleCondition)}</td>
            </tr>
            <tr>
              <td>Ownership</td>
              <td>{safe(quoteData.vehicle?.ownerCheck)}</td>
              <td>Purchase</td>
              <td>
                {safe(quoteData.vehicle?.purchaseMonth)}{" "}
                {safe(quoteData.vehicle?.purchaseYear)}
              </td>
            </tr>
            <tr>
              <td>Commute Usage</td>
              <td>{safe(quoteData.vehicle?.commuteUsage)}</td>
              <td>Commute Distance</td>
              <td>{safe(quoteData.vehicle?.commuteDistance)}</td>
            </tr>
            <tr>
              <td>Business Use</td>
              <td>{safe(quoteData.vehicle?.businessUse)}</td>
              <td>Annual Distance</td>
              <td>{safe(quoteData.vehicle?.annualDistance)}</td>
            </tr>
          </tbody>
        </Table>

        {/* License Info */}
        <h5 className="mt-4">🪪 License Info</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td>License Number</td>
              <td>{safe(quoteData.license?.licenseNumber)}</td>
              <td>License Class</td>
              <td>{safe(quoteData.license?.licenseClass)}</td>
            </tr>
            <tr>
              <td>First Licensed Year</td>
              <td>{safe(quoteData.license?.firstLicensedYear)}</td>
              <td>Has Ontario License</td>
              <td>{safe(quoteData.license?.hasOntarioLicense)}</td>
            </tr>
          </tbody>
        </Table>

        {/* Driving History */}
        <h5 className="mt-4">📜 Driving History</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td>Had Claims</td>
              <td>{safe(quoteData.history?.hadClaims)}</td>
              <td>Had Insurance</td>
              <td>{safe(quoteData.history?.hadInsurance)}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <strong>Tickets:</strong>{" "}
                {quoteData.history?.tickets?.length > 0
                  ? quoteData.history.tickets
                      .map((t) => `${t.reason} (${t.month} ${t.year})`)
                      .join(", ")
                  : "None"}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <strong>Suspensions:</strong>{" "}
                {quoteData.history?.suspensions?.length > 0
                  ? quoteData.history.suspensions
                      .map((s) => s.length)
                      .join(", ")
                  : "None"}
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Group Discount */}
        {quoteData.groupDiscountOption === "addGroup" && (
          <>
            <h5 className="mt-4">🏷️ Group Discount</h5>
            <p>{safe(quoteData.groupDiscountInput)}</p>
          </>
        )}
      </Card>

      <div className="d-flex justify-content-end mt-4">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Download Quote PDF</Tooltip>}
        >
          <Button variant="outline-primary" onClick={downloadInvoice}>
            <FaDownload className="me-2" />
            Download Quote
          </Button>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

export default LeadPreview;
