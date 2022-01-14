import React, { useState } from "react";
import { Container } from "react-bootstrap";
import '../../assets/css/demos/photo.css'
import ChangePassword from "./forgotPassword/changePassword.component";
import FindUser from "./forgotPassword/findUser.component";
import SendCode from "./forgotPassword/sendCode.component";


export default function ForgotPassword() {
   

    const [step, setStep] = useState(0);
    const [userFind,setUserFind] = useState(null);
    const [changeToken,setChangeToken] = useState(null);
   
    const findUser = (user,token)=>{
        setUserFind(user)
        setChangeToken(token)
    } 
    const nextStep = ()=>{

        setStep(step+1)
    }

    const backStep=()=>{
        setStep(step-1)

    }
    const stepList = {
        0: <FindUser findUser={findUser} nextStep={nextStep}/>,
        1: <SendCode findUser={findUser} user={userFind} backStep={backStep} nextStep={nextStep} token={changeToken} />,
        2: <ChangePassword user={userFind} backStep={backStep} nextStep={nextStep}/>,
        3:<form className="form-signin" >
            <h3 className="form-signin-heading">Cambia tu contraseña</h3>
              <h5 className="form-signin">El cambio de contraseña se ha realizado con exito </h5>
              
              <a href="/" className="kafe-btn kafe-btn-mint btn-block"  name="subm">Volver al inicio</a>
              <br/>
        </form>
    }

    return <section className="login" >
        <Container>
            <div className="banner-content">
                <h1><i className="fa fa-smile"></i>SpotsCol</h1>
                {
                    stepList[step]
                }
               
            </div>
        </Container>
        
    </section>;
}

