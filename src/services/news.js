import api from './api';

export const getNews = async (page=1, pageSize=50, searchTerm="") => {
    try {
        const response = await api.get('news/', {
            params: {
                page,
                page_size:pageSize,
                search:searchTerm,
            },
        });
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}