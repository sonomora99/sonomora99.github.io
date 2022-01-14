import React, { useState } from "react";
import {  Row, Col } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axiosInstance from '../../../services/axios.service';
import { BASE_URL } from "../../../variables";

const schema = yup.object().shape({

    code: yup.number().required("Ingresa un codigo valido")
});

export default function SendCode(props) {



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:yupResolver(schema),
    });
    const [errorSendCode, setErrorSendCode] = useState(null);
    const [user, setUser] = useState(props.user);
    const [token, setToken] = useState(props.token);

    const sendCode = (data) => {
        let config = {
            headers: {
                xcgtkn: token,
            }
          }
          const sendData ={
              id:user.id,
              code:data.code
          }
          axiosInstance.post("auth/verifyCode", sendData, config).then((res)=>{
            if (res.status === 200) {
                if(res.data.ok){
                    props.nextStep()
                }
            }
        }).catch(error => {
            console.log(error.response)
            if (error.response) {
                const responses = error.response.data.errors
                setErrorSendCode(responses)
            }

        });
    }; 

    const findUser = () => {

        const sendData = {
            mail: user.mail
        }
        axiosInstance.post("auth/verifyUser", sendData).then(res => {
            if (res.status === 200) {
                props.findUser(res.data.user,res.data.token)
                setUser(res.data.user)
                setToken(res.data.token)
            }
        }).catch(error => {
            console.log(error.response)
            if (error.response) {
                const responses = error.response.data.errors
                setErrorSendCode(responses)
                console.log(errorSendCode);
            }

        });
    };
    return <form className="form-signin" onSubmit={handleSubmit(sendCode)}>
        <h3 className="form-signin-heading">Verifica que eres tú</h3>
        <h5 className="form-signin">Ingresa el codigo enviado a tu correo</h5>
        {
            errorSendCode?.map((element, index) => {
                return <p className="error-message" key={index}>{element.msg}</p>
            })
        }
        <p className="error-message">{errors.code?.message}</p>
        <div className="form-group">
            <Row>
                <Col lg={6} md={6}>
                    <span className="avatar">

                        <img className="img-resonsive img-circle ng-pristine ng-untouched ng-valid ng-empty" width="35" height="35" alt="..." src={BASE_URL+user?.profile_img} /></span>
                </Col>
                <Col lg={6} md={6}>
                    <div className="row"><p >{user?.name}</p></div>
                    <div className="row"><p >{user?.mail}</p></div>
                </Col>
            </Row>

        </div>
        <div className="form-group">
            <input type="number" className="form-control" name="codigo" placeholder="codigo" required {...register("code")}/>
        </div>
        <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">Verificar</button>
        <br />

        <input className="btn btn-dark " type="button" onClick={findUser}value="solicitar codigo de nuevo" />

        <br />
        <input className="btn btn-dark " type="button" onClick={props.backStep}value="Volver" />
    </form>
}