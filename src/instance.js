import axios from 'axios';

// axios istekleri için bir base location belirle
const instance = axios.create({
  baseURL: 'https://sinifprojesi.herokuapp.com/'
});

export default instance;
