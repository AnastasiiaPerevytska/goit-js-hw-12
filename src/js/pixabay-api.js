import axios from 'axios';

const API_KEY = '44100586-6dae9d5f9d68e136096a0f58f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
