import { API_ENDPOINTS } from "@/config/api.config";
import { httpClient } from "../httpClient";
import { Lead, LeadPayload, LeadApiResponse } from "./leadTypes";

export const leadApi = {
  getLeads: async (): Promise<Lead[]> => {
    const response = await httpClient.get<LeadApiResponse<Lead[]>>(
      API_ENDPOINTS.LEADS.GET_ALL
    );
    return response.data.data;
  },

  getLeadById: async (id: string): Promise<Lead> => {
    const response = await httpClient.get<LeadApiResponse<Lead>>(
      API_ENDPOINTS.LEADS.GET_BY_ID(id)
    );
    return response.data.data;
  },

   getAffiliateLeadsById: async (id: string): Promise<Lead> => {
    const response = await httpClient.get<LeadApiResponse<Lead>>(
      API_ENDPOINTS.LEADS.AFFILIATE_LEADS_BY_ID(id)
    );
    return response.data.data;
  },

  updateLead: async (id: string, data: LeadPayload): Promise<Lead> => {
    const response = await httpClient.patch<Lead>(
      API_ENDPOINTS.LEADS.UPDATE(id),
      data
    );
    return response.data;
  },

  deleteLead: async (id: string): Promise<{ message: string }> => {
    const response = await httpClient.delete<LeadApiResponse<{ message: string }>>(
      API_ENDPOINTS.LEADS.DELETE(id)
    );
    return response.data.data;
  },
};
