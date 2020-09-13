import axios from "axios"

// axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.baseURL = "http://106.54.98.59:8081/releaseActivity";
axios.defaults.baseURL = "http://106.54.98.59:8081/relActTest"
// axios.defaults = { withCredentials: true};
//跨域字段处理
// axios.defaults.withCredentials = true;


export default axios;