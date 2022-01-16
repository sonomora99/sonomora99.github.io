
import Axios from "axios";


const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const refreshToken = ()=>{
    const token = localStorage.getItem('xreftkn');

    if(token){
        Axios.post(process.env.REACT_APP_BASE_URL+"auth/refreshToken",{token}).then(res=>{
            if(res.status===200){
                localStorage.setItem('xacctkn',res.data.tkn);
                localStorage.setItem('xreftkn',res.data.tkr);
            }
        }).catch(err=>{
            if(err.response.status === 403){
                localStorage.removeItem('xacctkn');
                localStorage.removeItem('xreftkn');
            }
    
        })
    }
}
// refresh Token every call
axiosInstance.interceptors.request.use((config)=>{
    refreshToken()
    const tka= localStorage.getItem('xacctkn');
    const tkr= localStorage.getItem('xreftkn');

    if(tka && tkr ){
        config.headers.xacctkn= "Bearer "+tka;
        config.headers.xreftkn= "Bearer "+tkr;
    }
    return config;
})
// axiosInstance.interceptors.response.use(response=>{

//     return response;
// })
export default axiosInstance