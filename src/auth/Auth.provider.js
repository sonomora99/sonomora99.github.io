import React, { createContext, useEffect, useState } from "react";
import axiosInstance from '../services/axios.service';
import  {io} from 'socket.io-client'
import { SOCKET_URL } from "../variables";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    
    // User attribute 
    const [user, setUser] = useState(null);
    const [errorSingUp, setErrorSingUp] = useState(null)
    const [errorLogin, setErrorLogin] = useState(null)
    const [socket, setSocket] = useState(null);
    const [notifications,setNotifications] = useState([])
    const [numNotifications,setNumNotifications] = useState(0)
    const [chatNotifications,setChatNotifications] = useState([])
    const logout = () => {

        localStorage.removeItem('xacctkn');
        localStorage.removeItem('xreftkn');
        setUser(null)
    }
    const getUser = () => {
        axiosInstance.get("users/me").then(res => {
            if (res.status === 200) {
                setUser(res.data.user)
            }
        }).catch(err => {
            console.log(err);
            // logout()
        })
    }
    useEffect(() => {
        setSocket(io(SOCKET_URL))
        getUser()
        getNotifications()
        
    }, [])
    
    useEffect(() =>{
        socket?.on("getNotification",data=>{
            console.log("emite",data);
            console.log("notificaciones actuales", notifications);
           
            setNotifications((prev)=>{
                let newNoti = [...prev,data]
                countNotifications(newNoti)
                return newNoti
            })
        })
        
    },[socket])
    
    useEffect(() =>{
        if(user){
            socket?.emit("addUser",user)
            
        }

    },[socket,user])

    const getNotifications= ()=>{
        axiosInstance.get("users/getNotifications").then(res=>{
            console.log("trae noti",res);
            if(res.status === 200){
                setNotifications(res.data.notifications)
                countNotifications(res.data.notifications)
            }
        }).catch(err => {
            console.log(err);
            // logout()
        })
    }
    const countNotifications = (notificacioneList) =>{
        let count = 0;
        notificacioneList.map(notification=>{
            if(notification.viewed == 0){
                count++;
            }
        })
        setNumNotifications(count)
    }
    const contextValue = {
        socket,  
        user,   
        notifications,
        numNotifications,
        chatNotifications,
        errorSingUp,
        errorLogin,
        isLogged: () => {

            return !!user;
        },
        
        singUp: (data, hobbies) => {
            const hobbiesSend = []; hobbies.forEach(element => {
                hobbiesSend.push(element.id)
            })

            const sendData = {
                nickname: data.nickname,
                name: data.name,
                password: data.password,
                id_city: data.city,
                mail: data.mail,
                id_profile_type: data.empresa,
                hobbies: hobbiesSend
            }
            axiosInstance.post("auth/signUp", sendData).then(res => {

                if (res.status === 200) {
                    localStorage.setItem("xacctkn", res.data.token)
                    localStorage.setItem("xreftkn", res.data.refreshToken)
                    setUser(res.data.user)
                }
            }).catch(error => {
                console.log(error);
                console.log(error.response)

                if (error.response) {
                    const responses = error.response.data.errors
                    console.log(responses);
                    setErrorSingUp(responses)

                }
            });
        },
        logIn: (mail, password) => {
            const sendUser = {
                mail,
                password
            }
            axiosInstance.post("auth/signin", sendUser).then(res => {
                if (res.status === 200) {
                    console.log("Entra");
                    localStorage.setItem("xacctkn", res.data.token)
                    localStorage.setItem("xreftkn", res.data.refreshToken)
                    setUser(res.data.user)
                }
            }).catch(error => {
                if (error.response) {
                    console.log("entra error login");
                    const responses = error.response.data.error
                    setErrorLogin(responses)
                    logout()
                }
            });
        },
        logOut: () => {
            logout()
        },
    }
    // const logout = ()=>{
    //     localStorage.setItem("xacctkn", null)
    //     localStorage.setItem("xreftkn", null)
    //     setIsLogIn(verifyToken())
    // }
    // const contextvalue = {

    //     errorLogin,
    //     errorSingUp,
    //     

    //     
    // }

    return <AuthContext.Provider value={
        contextValue
    }>
        {children}
    </AuthContext.Provider>;

}
