import axios from "axios";

export const getPosts = async () => {
    const API_URL = "http://localhost:8080";
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    try {
        const response = await axios.get(`${API_URL}/feed`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
        }
    });

        return response.data;

    } catch (err) {
        throw err;
    }

} 