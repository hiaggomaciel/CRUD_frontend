import { createContext, useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api, createSession } from '../services/api'

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};



export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoverdUser = localStorage.getItem("user_id")

        if (recoverdUser){
            setUser(JSON.parse(recoverdUser))
            
        }

        setLoading(false)

    }, [])
  
    const login = async (email, password) => {
        const response = await createSession(email, password)
        

        const token = response.data.access

        const loggedUserId = parseJwt(token).user_id

        console.log(loggedUserId, token)

        localStorage.setItem("user_id", JSON.stringify(loggedUserId))
        localStorage.setItem("token", token)

        api.defaults.headers.Authorization = `Bearer ${token}`


        
        setUser(loggedUserId)
        navigate("/dashboard")
        
        };

  
    const logout = () => {
      console.log("Logout")
      localStorage.removeItem("user_id")
      localStorage.removeItem("token")


      api.defaults.headers.Authorization = null
      setUser(null)
      navigate('/entrar')
    };
    return (

        <AuthContext.Provider 
            value={{authenticated: !!user, user, loading, login, logout}} > 
            {children}
        </AuthContext.Provider>
    )
} 