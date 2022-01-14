import React from 'react';
import { Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import useAuth from '../../auth/useAuth';
import SingUpForm from './SingUp.component';

const schema = yup.object().shape({
  
    password: yup.string().required("La contraseña es obligatoria"),
  
    email: yup.string().email("Error en el formato del correo").required("El correo es obligatorio"),
  });
export default function LoginForm() {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:yupResolver(schema),
    });

  
    const onSubmit = (data) => {
        auth.logIn(data.email,data.password);
    };

    return (

        <Col lg={4} md={12} sm={12} xs={12} className="col-lg-offset-4">
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-wrap">
                    <div className="form-group">
                        <input name="email" type="mail" className="form-control" placeholder="email" {...register("email")}
                           />
              <p className="error-message">{errors.email?.message}</p>
                           
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password"
                            {...register("password")}/>
                    <p className="error-message">{errors.password?.message}</p>

                    </div>
                    <div className="form-group">
                    {
                        auth.errorLogin?.map((element,index)=>{
                            return <p className="error-message" key={index}>{element.msg}</p>
                        })
                    }

                    </div>
                    <button className="btn-theme btn-block " type="submit" name="login"><i className="fa fa-lock"></i>
                        Entrar</button>

                    <label className="checkbox text-center">
                        <span className="text-center">
                            <a href="/forgotPassword">Olvidaste tu contraseña?</a>
                        </span>
                    </label>
                </div>
            </form>
            <br/>
            <SingUpForm />
            
        </Col>
    );
}