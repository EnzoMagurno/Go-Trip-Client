import axios from 'axios';


axios.defaults.baseURL = process.env.BASE_URL;

axios.defaults.baseURL = "http://localhost:8000"; 
  // axios.defaults.baseURL = "https://gotrippf-production.up.railway.app/"


export default axios;