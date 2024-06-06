import { handleResponse } from "./serviceUtil";
import { getAuthHeader } from "./serviceUtil";
import { mockCustomers } from "../features/reports-page/__mocks/mockCustomers";

const API_BASE_URL = 'http://localhost:3001';

export const CustomerService = {
    getAllCustomers: async (accessToken) => {
    //   const response = await fetch(`${API_BASE_URL}/customers`, {
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`
    //     }
    //   });
    //   return handleResponse(response);

    return mockCustomers;
    },
  
    searchCustomers: async (searchQuery, accessToken) => {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ search_query: searchQuery })
      });
      return handleResponse(response);
    }
  };