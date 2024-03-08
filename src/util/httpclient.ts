import axios from "axios" 

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
})
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  function (error: { response: { status: number; data: { message: string } } }) {
    if (error.response.status === 500) {
      error.response.data.message = "Something wrong has happened. Try again later."
    }
    console.log(error);
    
    return Promise.reject(error)
  },
)

export default instance