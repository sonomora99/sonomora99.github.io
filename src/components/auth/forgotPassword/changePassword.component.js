import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axiosInstance from '../../../services/axios.service';

const schema = yup.object().shape({

    password: yup.string().required("Ingresa una contraseña")
});

export default function ChangePassword(props){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:yupResolver(schema),
    });

    const [errorChangePassword, setErrorChangePassword] = useState(null);
    const [user] = useState(props.user);
    const [token] = useState(props.token);
    const changePassword = (data) => {
        console.log("entra");
        let config = {
            headers: {
                xcgtkn: token,
            }
          }
          const sendData ={
              id:user.id,
              password:data.password
          }
          axiosInstance.post("auth/changePass", sendData, config).then((res)=>{
            if (res.status === 200) {
                if(res.data.ok){
                    props.nextStep()
                }
            }
        }).catch(error => {
            console.log(error.response)
            if (error.response) {
                const responses = error.response.data.errors
                setErrorChangePassword(responses)
            }

        });
    };

    return <form className="form-signin" onSubmit={handleSubmit(changePassword)}>
    <h3 className="form-signin-heading">Cambia tu contraseña</h3>
      <h5 className="form-signin">Ingresa una nueva contraseña</h5>
      {
            errorChangePassword?.map((element, index) => {
                return <p className="error-message" key={index}>{element.msg}</p>
            })
        }
        <p className="error-message">{errors.password?.message}</p>

      <div className="form-group">
       <input type="password" className="form-control" name="password" placeholder="Nueva contraseña"  {...register("password")} required />
      </div>
      <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">Cambiar contraseña</button>
      <br/>
      <a href="true" className="btn btn-dark " onClick={props.backStep} role="button">Volver</a>
</form>
}