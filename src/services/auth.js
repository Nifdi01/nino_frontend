import API from "./api";

export const login = (credidentials) => API.post('/users/login/', credidentials);
export const register = (data) => API.post('users/register'/, data);
export const fetchUsers = () => API.get('/users/all/');
export const fetchNews = () => API.get('/news/');
export const fetchSources = () => API.get('/sources/');
export const fetchKeywords = () => API.get('/keywords/');