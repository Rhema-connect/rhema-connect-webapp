 import axios from "../util/httpclient" 

export interface LoginDataType {
  email: string;
  password: string;
}

export interface SignUpDataType {
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  password: string,
  phone: string,
  gender: string
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

export function useCreateAdmiinCallback() {
  
  const handleCreateAdmin = async (postData: SignUpDataType): Promise<any> => {    
    try{ 
        const response = await axios.post('/admin/auth/create-account', postData,
        {
          headers: {'Content-Type':'application/json'}, 
        }); 
        return response       
    } catch(err: any) { 
      console.log(err);
      
      return err?.response    
    }     
  }
  return { handleCreateAdmin }
}