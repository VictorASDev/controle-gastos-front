import axios from "axios";

export const getFollows = async (username: string) => {
    const token = sessionStorage.getItem("token");
    if(!token) {
        throw new Error("User not authenticated");
    }
    try {
        const res = await axios.get("http://localhost:8080/follows", {
            params: {
                username: username
            },
            
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });

        return res.data;
        
    } catch (err) {
        throw err;
    }
}