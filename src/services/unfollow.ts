import axios from "axios";

const API_URL = "http://localhost:8080";

export const unfollow = async (username: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const response = await axios.delete(`${API_URL}/follows/${username}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    });
    console.log(response);
    return response.data;

}