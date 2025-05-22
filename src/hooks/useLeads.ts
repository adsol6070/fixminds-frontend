import { leadApi } from "@/api/lead/leadApi";
import { Lead } from "@/api/lead/leadTypes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// 🔁 Reusable mutation hook
const useCustomMutation = <T, V>(
  mutationFn: (variables: V) => Promise<T>,
  queryKey: string[],
  successMessage: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong!");
      console.error("Mutation Error:", error);
    },
  });
};

// ✅ Get all leads
export const useAllLeads = () =>
  useQuery<Lead[], Error>({
    queryKey: ["leads"],
    queryFn: leadApi.getLeads,
  });

// ✅ Get single lead by ID
export const useLeadById = (id: string) =>
  useQuery<Lead, Error>({
    queryKey: ["lead", id],
    queryFn: () => leadApi.getLeadById(id),
    enabled: !!id,
  });

export const useAllAffiliateLeads = (id: string) =>
  useQuery<Lead, Error>({
    queryKey: ["lead", id],
    queryFn: () => leadApi.getAffiliateLeadsById(id),
    enabled: !!id,
  });


// ✅ Delete lead
export const useDeleteLead = () =>
  useCustomMutation(
    (id: string) => leadApi.deleteLead(id),
    ["leads"],
    "Lead deleted successfully!"
  );
