import api from './api';

export const getSources = async (page=1, pageSize=20, searchTerm="") => {
    try {
        const token = localStorage.getItem('accessToken');
        const response  = await api.get('sources/', {
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

export const getSource = async (id) => {
    try {
        const response = await api.get(`/sources/${id}`);
        return response.data;
    } catch (error){
        let errorMessage = 'Something went wrong...';
        throw new Error(errorMessage);
    }
}


export const createSource = async (source) => {
    try {
        const response = await api.post('/sources/', source);
        return response.data;
    } catch (error) {
        throw new Error(error);
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
        const response = await api.delete(`sources/${id}`, id);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

