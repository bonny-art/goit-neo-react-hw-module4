import axios from "axios";

const API_KEY = "40358053-aa77a52d7b78d629a29aff12d";
const BASE_URL = "https://pixabay.com/api/";

const pixabayInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: "photo",
    safesearch: "true",
  },
});

export const fetchFromPixabay = async (params = {}) => {
  try {
    const response = await pixabayInstance.get("/", { params });
    return response.data;
  } catch (error) {
    console.error("Error while fetching data from Pixabay API:", error);
    throw error;
  }
};
