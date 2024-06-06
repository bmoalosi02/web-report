import { SuccessfulLogin, UnsuccessfulLogin } from "./_mocks/mockLoginResponse";
import { handleResponse } from "./serviceUtil";
import { getAuthHeader } from "./serviceUtil";
const API_BASE_URL = 'http://localhost:3002';


export const AuthService = {
    login: async (username, password) => {        

        // try {
        //     const response = await fetch(`${API_BASE_URL}/users/login`, {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': getAuthHeader(username, password)
        //         },
        //         body: JSON.stringify({username, password})
        //       });
        //       return handleResponse(response);
        // } catch (error) {
            
        // }
      
        // Mock
        if (username === 'sam1' && password === 'sam123') {
          return SuccessfulLogin;
        } 

        return UnsuccessfulLogin;
    },
  
    forgotPassword: async (username) => {
      const response = await fetch(`${API_BASE_URL}/users/forgot_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader('admin', 'password') // Replace with your admin credentials
        },
        body: JSON.stringify({ username })
      });
      return handleResponse(response);
    },
  
    updatePassword: async (username, newPassword) => {
      const response = await fetch(`${API_BASE_URL}/users/update_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader(username, newPassword)
        },
        body: JSON.stringify({ username, newPassword })
      });
      return handleResponse(response);
    }
  };