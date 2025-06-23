import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const signup = (username: string, password: string): Promise<void> => {
    return axios.post(`${API_URL}/users`, {
        username,
        password
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error('Failed to sign up');
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        throw error;
    });
}