import axios from 'axios';

// axios istekleri için bir base location belirle
const instance = axios.create({
  baseURL: 'http://localhost:5000'
  // baseURL: 'http://sinifprojesi.herokuapp.com/'
});

export default instance;
