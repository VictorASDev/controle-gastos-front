const API_URL = "http://localhost:8080";

export const getUser = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
        },
    });
}