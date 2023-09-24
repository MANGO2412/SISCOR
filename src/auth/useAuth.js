import {createContext,useContext,useMemo} from 'react';
import {useNavigate} from 'react-router-dom'
import {useLocalStorage} from "./useLocalStorage"
import axios from 'axios';


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useLocalStorage("user",null);
    const navigate=useNavigate();


    /**you can use this function if you want to authenticate to a user */
    const login=async(data)=>{
        try{
            const response = await axios.post('http://localhost:3000/auth/login', data);
        if (response.status === 200 && response.data){
            setUser(response.data);
            navigate('welcome/about')
        }
        else{
            console.error('Te equivocaste en algo');
        }
    } catch (error) {
        console.error('Error al iniciar sesion por:', error);
    }
   };

   // esta es la de cerrar sesion
    /**you can use this function to  sign out logged  in user */
    const logout=()=>{
      setUser(null)
       navigate("/",{replace:true});
    };


    const value=useMemo(
        ()=>({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



export const useAuth=()=>{
    return useContext(AuthContext);
}