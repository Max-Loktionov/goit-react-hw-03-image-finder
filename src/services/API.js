import axios from 'axios';

const KEY = '27626475-8422ee6256ea07f97d3a4bc44';
async function getGallery(newQuery, newPage) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&q=${newQuery}&page=${newPage}&per_page=12`
  );
  return response.data;
}

const API = { getGallery };
export default API;
