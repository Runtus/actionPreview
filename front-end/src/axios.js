import axios from "axios"

axios.defaults.baseURL = "http://118.31.105.159:3389";
// axios.defaults = { withCredentials: true};
//跨域字段处理
axios.defaults.withCredentials = true;


export default axios;