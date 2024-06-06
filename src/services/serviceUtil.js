import { Buffer } from "buffer";
// Function to handle response status
export const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Something went wrong');
    }
    return response.json();
  };

  // Function to create Basic Auth header
export const getAuthHeader = (username, password) => {
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    return `Basic ${token}`;
  };