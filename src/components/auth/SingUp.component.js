import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Departaments from '../Departaments.component';
import Categories from '../categories.component';
import { Modal } from 'react-bootstrap';
import Hobbies from '../hobbies.component';
import useAuth from '../../auth/useAuth';


const schema = yup.object().shape({
    nickname: yup.string().required("El nickname es obligatorio"),
    name: yup.string().required("Ingresa un nombre"),
    password: yup.string().required("La contraseña es obligatoria"),
    city:yup.string().required("Selecciona una ciudad"),
    mail: yup.string().email("Error en el formato del correo").required("El correo es obligatorio"),
    empresa:yup.string().required("Selecciona un valor"),
  });


export default function SingUpForm() {

  const auth = useAuth();
    
    const nicknameExist = false;
    const mailExist = false;
    const [show, setShow] = useState(false);
    const [idCategory,setIdCategory] = useState(0)
    const [hobbies,setHobbies] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver:yupResolver(schema),
    });

    const onSubmit = (data) =>{
      auth.singUp(data,hobbies);
    };
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
      setIdCategory(e.target.value)

        setShow(true)
      };
    const addHobbies= (hobbySelected)=>{
      setHobbies(hobbySelected)
    }



    
    return (
        <div>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="form-login-heading">Registrate unete a Spots</h4>
            <div className="login-wrap">
              <div className="form-group">
                <input id="nickname" type="text" className="form-control" placeholder="Nombre de usario / Aka / Alias"
                  {...register("nickname")} />
              </div>
              <p className="error-message">{errors.nickname?.message}</p>
              {
                  nicknameExist?
                  <div  className="form-group">
                  <p className="error-message">Este nickname ya esta registrado</p>
                </div>:""
              }
              
              <div className="form-group">
                <input id="nombre" type="text" className="form-control" placeholder="nombres" {...register("name")} />
              <p className="error-message">{errors.name?.message}</p>

              </div>
              <div className="form-group">
                <input id="password" type="password" className="form-control" placeholder="Contraseña" {...register("password")} />
                <p className="error-message">{errors.password?.message}</p>

              </div>
              <Departaments register={register}/>
              <div className="form-group">
              <p className="error-message">{errors.city?.message}</p>
              </div>
              <div className="form-group">
                <input id="correo" ng-change="rl.verificarCorreo()" type="email" className="form-control" placeholder="Correo" {...register("mail")} />
              <p className="error-message">{errors.mail?.message}</p>

              </div>
              {
                  mailExist?<div  className="form-group">
                <p className="error-message">Este correo ya esta Registrado</p>
              </div>:""
              }
              <Categories onClick={handleShow} className=" btn-theme btn-block" />
              
              
              <div className="form-group">
                <h4 className="form-login-heading">vendes productos o servicios</h4>
                <div className="login-wrap" style={{paddingBottom:"0%"}} >
                <div className="custom-control custom-radio" align="center">
                  
                  <label className="btn btn-theme" >
                    <input type="radio" className="custom-control-input"  id="si" value="1" ng-value="1" name="empresa"
                    {...register("empresa")}/>
                    Si
                  </label>
                  
                  <label className="btn btn-theme" >
                    <input type="radio" className="custom-control-input"  id="no" value="0" ng-value="0" name="empresa"
                     {...register("empresa")} checked />
                    No
                  </label>
              <p className="error-message">{errors.empresa?.message}</p>

                </div>
              </div>
              </div>
              <div className="form-group">
                
                  <p className="aviso" style={{color: "black"}}>Al hacer click en registrar, aceptas nuestros <a className="terms" href="/login">Términos y condiciones</a> y nuestra <a className="terms" href="/login">Política de datos</a>  </p>
                
              </div>
              <div className="form-group">
              {
                        auth.errorSingUp?.map((element,index)=>{
                            return <p className="error-message" key={index}>{element.msg}</p>
                        })
                    }
              </div>
              <button className=" btn-theme btn-block"  name="register" type="submit"><i className="fa fa-lock"></i>
                Registrar</button>
            </div>
          </form>
          <Modal animation={false} show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body><Hobbies idCategory={idCategory} hobbies={hobbies} addHobbies={addHobbies}/></Modal.Body>
      
          </Modal>
          </div>
    );
    
}


