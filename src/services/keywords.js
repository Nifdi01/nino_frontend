import api from './api';

export const getKeywords = async (page=1, pageSize=20, searchTerm="") => {
    try {
        const token = localStorage.getItem('accessToken');
        const response  = await api.get('keywords/', {
            params:{
                page,
                pageSize: pageSize,
                search: searchTerm,
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error){
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw new Error(error);
    }
};

export const getKeyword = async (id) => {
    try {
        const response = await api.get(`keywords/${id}`);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
};

export const createKeyword = async (keyword) => {
    try {
        const response = await api.post('/keywords/', keyword);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
};


export const updateKeyword = async (keyword) => {
    try {
        const response  = await api.post('keywords/', keyword);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
};


export const deleteKeyword = async (id) => {
    try {
        const response = await api.delete(`keywords/${id}`);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}