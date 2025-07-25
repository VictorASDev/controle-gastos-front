import axios from "axios";

const API_URL = "http://localhost:8080";

export const getUser = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const response = await axios.get(`${API_URL}/profile/me`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
        },
    });

    console.log(response);
    return response.data;

}