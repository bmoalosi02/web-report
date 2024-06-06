import { mockBranches } from "../features/reports-page/__mocks/mockBranches";
import { handleResponse } from "./serviceUtil";
const API_BASE_URL = 'http://localhost:3001';

export const BranchService = {
    getAllBranches: async (accessToken) => {
    //   const response = await fetch(`${API_BASE_URL}/branches`, {
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`
    //     }
    //   });
    //   return handleResponse(response);

    // Mocks
    return mockBranches;
    },
  
    searchBranches: async (searchQuery, accessToken) => {
      const response = await fetch(`${API_BASE_URL}/branches`, {
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