import { create } from 'zustand';

type State = {
    check: string, 
} 

type Action = {
    setCheck: (data: State['check']) => void  
}

const checkdata = create<State & Action>((set) => ({
    check: "",  
    setCheck: (data) => set(() => ({ check: data })), 
}));



export default checkdata