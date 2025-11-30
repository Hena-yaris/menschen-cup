import { useEffect,createContext, useState} from "react";
import axiosBase from "../api/axiosBase";
export const AuthContext= createContext()

export const AuthProvider = ({children})=> {

    const [user, setUser] = useState(null);
    const [loading, setLoading] =useState(true)
    
    const token = localStorage.getItem("token");

    const checkUser = async ()=> {
        if(!token){
            setUser(null);
            setLoading(false)
            return;
        }

        try {
            const {data} = await axiosBase.get("/users/check",{
                headers: {Authorization: "Bearer " + token },
            })
            setUser(data);
        } catch (err) {
         setUser(null);
         localStorage.removeItem("token")   
        }finally {
            setLoading(false)
        }
    }


    useEffect(()=> {
        checkUser();
    },[]);

    return (
       <AuthContext.Provider value= {{user,setUser,loading}} >
         {children}
       </AuthContext.Provider>
    )
}