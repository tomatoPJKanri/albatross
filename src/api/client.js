import axios from 'axios';

const client = axios.create({
  baseURL: 'https://sparrowserver.herokuapp.com',
});

export default client;
