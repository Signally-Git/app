import axios from "axios";

export const checkImageExists = async (imageUrl) => {
    try {
        const response = await axios.head(imageUrl);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};
