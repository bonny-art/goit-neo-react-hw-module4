import axios from "axios";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${accessKey}`,
  },
});

export const fetchFromUnsplash = async (endpoint, params = {}) => {
  try {
    const response = await unsplashInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error while fetching data from Unsplash API:", error);
    throw error;
  }
};
