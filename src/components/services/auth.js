// auth.js
import api from "./api";

export const registerUser = async(credentials) => {
    try {
        const response = await api.post('/users/register/', credentials);
        return response.data;
    } catch (error) {
        console.error('API Error: ', error);
        const errorData = error.response?.data;
        let errorMessage = 'Registration failed. Please try again.';
    
        if (errorData) {
            if (errorData.detail){
                errorMessage = errorData.detail;
            } else if (errorData.error){
                errorMessage.Object.values(errorData.errors).flat().join(' ');
            }
        }
        throw { detail: errorMessage};
    }
}

export const loginUser = async (credentials) => {
//   console.log('Login credentials:', credentials); // Debug
  try {
    const response = await api.post('/users/login/', credentials); // Full endpoint path
    // Save tokens to localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userEmail', response.data.email);
    localStorage.setItem('userCompany', response.data.company);
    localStorage.setItem('userRole', response.data.role);
    return response.data
  } catch (error) {
    console.error('API Error:', error); // Debug

    // Extract error messages
    const errorData = error.response?.data;
    let errorMessage = 'Login failed. Please try again.';

    if (errorData) {
      if (errorData.detail) {
        errorMessage = errorData.detail;
      } else if (errorData.errors) {
        // Combine all error messages into a single string
        errorMessage = Object.values(errorData.errors).flat().join(' ');
      }
    }

    throw { detail: errorMessage };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};


export const isAdmin = () => {
    const role = localStorage.getItem("userRole");
    return role === 'admin';
}