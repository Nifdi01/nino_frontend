import api from './api';

export const getOverviewStatistics = async () => {
    try {
        const response = await api.get('/statistics');
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


export const getSourceStatistics = async () => {
    try {
        const response = await api.get('/statistics/sources/');
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}