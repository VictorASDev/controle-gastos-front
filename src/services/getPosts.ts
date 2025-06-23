export const getPosts = async () => {
    const API_URL = "http://localhost:8080";
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const response = await fetch(`${API_URL}/feed`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
} 