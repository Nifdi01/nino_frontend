import api from './api';

export const getOverviewStatistics = async () => {
    try {
        const response = await api.get('/statistics/overview');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


export const getSourceStatistics = async () => {
    try {
        const response = await api.get('/statistics/sources');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

export const getNewsStatistics = async () => {
    try {
        const response = await api.get('/statistics/news');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}


export const getKeywordStatistics = async () => {
    try {
        const response = await api.get('/statistics/keywords');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}