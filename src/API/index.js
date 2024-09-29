import axios from "axios";

const api=axios.create({
    baseURL:import.meta.VITE_SERVER_URL
})
export default api