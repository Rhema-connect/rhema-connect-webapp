
import axios from "../util/httpclient"


const getservicedata = async (url: string, params?: any) => { 

    try { 
        const response = await axios.get(url, {
            params: params
        }) 
        
        return response
    } catch (err: any) {
        console.log(err?.response?.data?.message);
        
        if (err?.response?.data?.message === "Token is not valid, please login again" || err?.response?.data?.message === "No token provided, please login") {
            localStorage.clear()
            localStorage.setItem("notoken", "true")
            window.location.href = "/";
        }
        return err
    }
}

const actionService = {

    getservicedata

}


export default actionService