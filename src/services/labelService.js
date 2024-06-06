import { mockLabelTypes } from "../features/reports-page/__mocks/mockLabelTypes";
import { handleResponse } from "./serviceUtil";
import { getAuthHeader } from "./serviceUtil";
const API_BASE_URL = 'http://localhost:3001';

export const LabelTypeService = {
    getAllLabelTypes: async (accessToken) => {
    //   const response = await fetch(`${API_BASE_URL}/label-types`, {
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`
    //     }
    //   });
    //   return handleResponse(response);

    // mocks
    return mockLabelTypes;
    },
  
    searchLabelTypes: async (searchQuery, accessToken) => {
      const response = await fetch(`${API_BASE_URL}/label-types`, {
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