import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8088";
// axios.defaults = { withCredentials: true};
//跨域字段处理
axios.defaults.withCredentials = true;


export default axios;