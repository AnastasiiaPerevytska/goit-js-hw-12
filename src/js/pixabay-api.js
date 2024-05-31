import axios from 'axios';

export const fetchImages = (query, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '43795533-00e69c3734dde476e8d836fd2',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: '15',
    },
  });
};