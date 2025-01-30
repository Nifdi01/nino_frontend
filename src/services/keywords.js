import api from './api';

export const getKeywords = async (page=1, pageSize=20, searchTerm="") => {
    try {
        const response  = await api.get('keywords/', {
            params:{
                page,
                page_size: pageSize,
                search: searchTerm,
            },
        });
        return response.data;
    } catch (error){
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
        const response = await api.delete(`keywords/${id}/`);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}