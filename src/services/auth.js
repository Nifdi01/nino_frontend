import api from "./api";

export const registerUser = async (credentials) => {
  console.log(credentials);
  try {
    const response = await api.post('/register/', credentials); // API call to login endpoint


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
    const response = await api.post('/login/', credentials); // API call to login endpoint

    // Save tokens and user information to localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userEmail', response.data.email);
    localStorage.setItem('userFirstName', response.data.first_name);
    localStorage.setItem('userLastName', response.data.last_name);
    localStorage.setItem('userFullName', response.data.full_name);
    localStorage.setItem('userCompany', response.data.company);
    localStorage.setItem('userRole', response.data.role);

    return response.data; // Return the response data if successful
  } catch (error) {
    // console.error('API Error:', error);

    const errorData = error.response?.data; // Adjusted for nested "errors"
    let errorMessage = 'Login failed. Please try again.'; // Default error message

    console.log(errorData);

    if (errorData) {
      // Extract field-specific errors and format them
      errorMessage = Object.entries(errorData)
        .map(([field, messages]) => `${messages.join(', ')}`)
    }

    throw new Error(errorMessage); // Throw the formatted error
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