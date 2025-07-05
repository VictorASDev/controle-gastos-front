import axios from "axios";

const API_URL = 'http://localhost:8080';

export const postFollow = async (followed: string) => {
    const token = sessionStorage.getItem("token");
    if(!token) {
        throw new Error("User not authenticated");
    }
    try {
        const response = await axios.post(`${API_URL}/follows/me`, {
            username: followed
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};