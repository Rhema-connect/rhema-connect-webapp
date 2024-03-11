 import axios from "../util/httpclient" 

export interface LoginDataType {
  email: string;
  password: string;
}

export function useLoginCallback() {
  
  const handleLogin = async (postData: LoginDataType): Promise<any> => {    
    try{ 
        const response = await axios.post('/admin/auth/login', postData,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
        return response       
    } catch(err: any) { 
      console.log(err);
      
      return err?.response    
    }     
  }
  return { handleLogin }
}