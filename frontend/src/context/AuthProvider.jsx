import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";


export const AuthContext = createContext();

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const publicPaths = ["/login", "/register"];

        if (publicPaths.includes(location.pathname)) {
            setLoading(false)
            return;
        };
        const checkAuth = async () => {         
            try {
                const res = await fetch("http://localhost:3000/api/v1/auth/refresh", {
                    credentials:"include"
                });
                const resObj = await res.json();        
                if (resObj.success) {

                    setUser(prev => ({
                        ...prev,
                        ...resObj.data.info}))                                    
                    setAccessToken(resObj.data.token)
                } else {
                    setUser(null)
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false)
            }
        }
        checkAuth();   
    }, [location.pathname])

    // logout handler
    const logout  = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/auth/logout/${id}`, {
            credentials: "include"
            }); 
            if (res.ok) {
                setUser(null);
                setAccessToken(null)
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false            
        }        
    }

    const value = {user, setUser, loading, logout, setAccessToken, accessToken};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

