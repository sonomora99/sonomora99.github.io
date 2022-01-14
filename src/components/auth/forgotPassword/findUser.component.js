import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axiosInstance from '../../../services/axios.service';

const schema = yup.object().shape({

    email: yup.string().email("Error en el formato del correo").required("El correo es obligatorio")
});
export default function FindUser(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorFind, setErrorFind] = useState(null);
    const setUser = (user,token)=>{
        props.findUser(user,token)
        if(user !==null){
            props.nextStep()
        }
    }

    const findUser = (data) => {

        const sendData = {
            mail: data.email
        }
        axiosInstance.post("auth/verifyUser", sendData).then(res => {
            if (res.status === 200) {

                setUser(res.data.user,res.data.token)

            }
        }).catch(error => {
            console.log(error);
            console.log(error.response)
            if (error.response) {
                const responses = error.response.data.errors
                setErrorFind(responses)
            }

        });
    };
    return <form className="form-signin" onSubmit={handleSubmit(findUser)}>
        <h3 className="form-signin-heading">Busca tu usuario</h3>
        <h5 className="form-signin">Busca tu cuenta ingresando un correo</h5>
        {
            errorFind?.map((element, index) => {
                return <p className="error-message" key={index}>{element.msg}</p>
            })
        }
        <p className="error-message">{errors.email?.message}</p>

        <div className="form-group">
            <input name="email" type="text" className="form-control" placeholder="Correo" required {...register("email")} />
        </div>

        <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">Buscar</button>
        <br />
    </form>
}