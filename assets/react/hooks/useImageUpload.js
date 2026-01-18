import { dataURLtoFile } from "../tools/remaper";
import { API_ENDPOINTS, authenticatedFetch } from "../config/api";

// Regex to check if the image is a file path (not a data URL)
const FILE_PATH_REGEX = /^([a-z]:)?([\\/][a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.(?!jpg|jpeg|png|webp)[a-z0-9]+$/i;

/**
 * Custom hook to handle image uploads
 * @returns {Function} uploadImage - Function to upload an image and get its path
 */
export const useImageUpload = () => {
    /**
     * Uploads an image to the server if it's a data URL
     * If it's already a file path, returns it as is
     *
     * @param {string} imageData - Image data URL or file path
     * @returns {Promise<string>} - The image path on the server
     */
    const uploadImage = async (imageData) => {
        if (!imageData || imageData === "") {
            return "";
        }

        // If it's already a file path, return it as is
        if (FILE_PATH_REGEX.test(imageData)) {
            return imageData;
        }

        // It's a data URL, upload it
        const formData = new FormData();
        formData.append("file", dataURLtoFile(imageData));

        try {
            const response = await authenticatedFetch(API_ENDPOINTS.IMAGES.UPLOAD, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.path || "";
        } catch (error) {
            console.error(`Failed to upload image: ${error.message}`);
            throw error;
        }
    };

    return { uploadImage };
};
