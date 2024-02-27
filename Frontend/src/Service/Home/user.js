import axios from 'axios';

const API_BASE_URL = "http://localhost:5050"

export const getFeaturedCategory = async () => {
    try {
        return await axios.get(
            `${API_BASE_URL}/api/v1/home/featured-category`
        )
    } catch (e) {
        throw e;
    }
}