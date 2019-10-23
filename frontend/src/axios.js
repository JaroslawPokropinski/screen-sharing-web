import _axios from 'axios';

const axios = _axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default axios;
