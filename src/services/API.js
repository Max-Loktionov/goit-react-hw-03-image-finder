import axios from 'axios';

const KEY = '27626475-8422ee6256ea07f97d3a4bc44';
axios.defaults = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal`;
async function getGallery(newQuery, newPage) {
  const response = await axios.get(
    `&q=${newQuery}&page=${newPage}&per_page=12`,
    (newQuery, newPage)
  );
  return response.data;
}

const API = { getGallery };
export default API;
