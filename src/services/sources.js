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
        const response = await api.post('/sources/', source);
        console.log('Source Created:', response.data);
        return response.data; // This should include the 'id' of the new source
    } catch (error) {
        console.error('Error creating source:', error);
        throw new Error(error.response?.data?.message || 'Failed to create source');
    }
};

export const updateSource = async (source) => {
    try {
        const response = await api.put(`sources/${source.id}`, source);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

export const deleteSource = async (id) => {
    try {
        const response = await api.delete(`sources/${id}/`, id);
        console.log(response.data);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

