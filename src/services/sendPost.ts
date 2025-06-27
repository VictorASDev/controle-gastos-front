import axios from "axios"

const API_URL = "http://localhost:8080"

const sendPost = async (post: string) => {
    const token = sessionStorage.getItem("token")
    if (!token) {
        throw new Error("User not authenticated")
    }

    try {
        const response = await axios.post(`${API_URL}/tweets`, {
            content: post
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Error sending post:", error)
        throw error
    }
}
export default sendPost