import axios from "axios";

const API_URL = "http://localhost:8080";

export const getProfile = async (user: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const response = await axios.get(`${API_URL}/profile`, {
        params: {
            username: user
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    });
    console.log(response);
    return response.data;

}