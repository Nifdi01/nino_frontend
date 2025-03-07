import api from './api';

export const getNews = async (page = 1, pageSize = 50, searchTerm = "", filters = {}) => {
  try {
    const payload = {
      page,
      pageSize: pageSize,
      search: searchTerm,
      filters: {
        sources: filters.sources || [],
        platforms: filters.platforms || [],
        keywords: filters.keywords || [],
        startDate: filters.start_date || "",
        endDate: filters.end_date || "",
      },
    };

    const response = await api.post("/news/", payload);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error);
    throw error;
  }
};
  