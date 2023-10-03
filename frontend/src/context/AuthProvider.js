import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();
export const ChatProvider = ({children}) =>{
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() =>{
        const LoginInfo = JSON.parse(localStorage.getItem('loginData'));
        setUser(LoginInfo);
        if(!LoginInfo){
            navigate('/login');
        }
    },[navigate])

    return (
        <ChatContext.Provider value={{user , setUser}}>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState = () =>{

   return useContext(ChatContext);
}
export default ChatProvider;
