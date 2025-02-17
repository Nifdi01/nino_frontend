import api from "./api";

export const registerUser = async (credentials) => {
  console.log(credentials);
  try {
    const response = await api.post('/auth/register', credentials); // API call to login endpoint


    return response.data; // Return the response data if successful
  } catch (error) {
    // console.error('API Error:', error);

    const errorData = error.response?.data; // Adjusted for nested "errors"
    let errorMessage = 'Registration failed. Please try again.'; // Default error message


    if (errorData) {
      // Extract field-specific errors and format them
      errorMessage = Object.entries(errorData)
        .map(([field, messages]) => `${messages.join(', ')}`)
        .join(' | ');
    }

    throw new Error(errorMessage); // Throw the formatted error
  }
};



export const loginUser = async (credentials) => {
  try {
    console.log('Attempting login with:', credentials);
    
    const response = await api.post('/auth/login', credentials);
    console.log('Login response:', response);

    if (response.data.token) {
      // Save tokens and user information to localStorage
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('userFirstName', response.data.firstName);
      localStorage.setItem('userLastName', response.data.lastName);
      localStorage.setItem('userCompany', response.data.company);
      localStorage.setItem('userRole', response.data.role);

      console.log("Sending Authorization Header:", localStorage.getItem("accessToken"));

      return response.data;
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    console.group('Login Error Details');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error:', error.message);
    }
    console.groupEnd();

    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response?.data) {
      const errorData = error.response.data;
      errorMessage = Object.entries(errorData)
        .map(([field, messages]) => 
          Array.isArray(messages) ? messages.join(', ') : messages.toString()
        )
        .join(' | ');
    }

    throw new Error(errorMessage);
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