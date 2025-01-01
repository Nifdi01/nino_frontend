import api from './api';

export const getSources = async () => {
    try {
        const response = await api.get('sources/');
        return response.data;
    } catch (error) {
        let errorMessage = 'Something went wrong...';

        throw new Error(errorMessage);
    }
}

export const getSource = async (id) => {
    try {
        const response = await api.get(`sources/${id}`);
        return response.data;
    } catch (error){
        let errorMessage = 'Something went wrong...';
        throw new Error(errorMessage);
    }
}


export const createSource = async (source) => {
    try {
        const response = await api.post('source/', source);
        return response.data;
    } catch (error){
        let errorMessage = 'Something went wrong...';
        throw new Error(errorMessage);
    }
}

export const updateSource = async (source) => {
    try {
        const response = await api.put(`source/${source.id}`, source);
        return response.data;
    } catch (error){
        let errorMessage = 'Something went wrong...';
        throw new Error(errorMessage);
    }
}

export const deleteSource = async (source) => {
    try {
        const response = await api.delete(`source/${source.id}`, source);
        return response.data;
    } catch (error){
        let errorMessage = 'Something went wrong...';
        throw new Error(errorMessage);
    }
}

