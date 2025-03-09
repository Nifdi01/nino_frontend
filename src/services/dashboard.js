import api from './api';

export const getTopSources = async () => {
    try {
        const response = await api.get('/dashboard/sources');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const getKeywords = async () => {
    try {
        const response = await api.get('/dashboard/keywords');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}