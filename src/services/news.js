import api from './api';

export const getNews = async (page = 1, pageSize = 50, searchTerm = "", filters = {}) => {
  try {
    const response = await api.get("news/", {
      params: {
        page,
        page_size: pageSize,
        search: searchTerm,
        ...filters, // Spread filters directly
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error);
    throw error;
  }
};
  