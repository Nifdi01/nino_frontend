import api from './api';

export const getKeywords = async () => {
    try {
        const response  = await api.get('keywords/');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

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