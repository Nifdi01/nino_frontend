import api from "./api";


export const getPlatforms = async () => {
    try {
        const response = await api.get("/platforms");
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}