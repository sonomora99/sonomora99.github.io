import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../auth/useAuth";
import axiosInstance from "../../../services/axios.service";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Col } from "react-bootstrap";
import SearchAddres from "../../searchAddress";
import Categories from "../../categories.component";
import  { Redirect } from 'react-router-dom'

const schema = yup.object().shape({
	name: yup.string().required("El nombre es obligatorio"),
	contactNumber: yup.number().required("El numero de contacto es obligatorio"),
	contactMail: yup.string().email("Error en el formato del correo").required("El correo es obligatorio"),
	address: yup.string().required("Como te ubicamos"),
	category: yup.number().required("Selecciona una categoria"),
	categoryName: yup.string(),
	today: yup.date().default(() => new Date()),
	dateEvent: yup.date().min(yup.ref("today"), "No puede iniciar el evento hoy").required("Selecciona una fecha "),
	description: yup.string().required("Describe tu evento"),

});

export default function GenerateEvent(props) {
	const auth = useAuth();
	const user = auth.user;
	const setAddress = (value) => {
		setValue("address", value)
	}
	const setCategory = (e) => {
		setValue("category", e.target.value)
		setValue("categoryName", e.target.innerText)
	}
	const {
		reset,
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [banner, setBanner] = useState([]);
	const [flyer, setFlyer] = useState([]);
	const [boletas, setBoletas] = useState([]);
	const [isSend, setIsSend] = useState(false);

	const onSubmit = (data) => {

		setIsSend(true)
		if (banner.length === 0 && flyer.length === 0) {
			return false;
		}

		const sendData = new FormData();
		let dateEvent = new Date(data.dateEvent)
		// let dateEvent = new Date(moment(data.dateEvent, "YYYYMMDD").format("DD-MM-YYYY"))

		sendData.append("id", user.id);
		sendData.append("name", data.name);
		sendData.append("contactNumber", data.contactNumber);
		sendData.append("contactMail", data.contactMail);
		sendData.append("address", data.address);
		sendData.append("category", data.category);
		sendData.append("dateEvent", dateEvent);
		sendData.append("description", data.description);
		banner.forEach((file, index) => {
		    sendData.append("file", file)
		})
		flyer.forEach((file, index) => {
		    sendData.append("file", file)
		})
		sendData.append("tickets", JSON.stringify(boletas));		
		axiosInstance.post("post/generateEvent", sendData).then(res => {
		    setIsSend(false)
			props.history.push('/profile')
		}).catch(err => {
			console.log(err);
		    if (err.response) {
		        console.log(err.response);
		    }
		    setIsSend(false)

		})
		reset()
		setFlyer([])
		setBanner([])
		setBoletas([])
	};

	const selectBanner = (e) => {
		setBanner(Array.from(e.target.files));
	}
	const selectFlyer = (e) => {
		setFlyer(Array.from(e.target.files));
	}
	const addBoleta = () => {
		if (watch("descBoleta") !== "" && watch("valorBoleta") !== "") {
			let boleta = { desc: watch("descBoleta"), value: watch("valorBoleta") }
			let repeat = boletas.filter(repetido => repetido.desc.toLowerCase() === boleta.desc.toLowerCase())
			if (repeat.length == 0) {
				setBoletas([...boletas, boleta])
			}
			setValue("descBoleta", "")
			setValue("valorBoleta", "")
		}
	}
	const removerBoleta = (boletaRemover)=>{
		let boletasNuevas = boletas.filter(difRemove => difRemove.desc.toLowerCase() !== boletaRemover.desc.toLowerCase());
		setBoletas(boletasNuevas)
	}
	return <div className="container-contact100">
		<form className="contact100-form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
			<span className="contact100-form-title">
				Vamos a crear un evento
			</span>
			<div className="wrap-input100 validate-input bg1">
				<span className="label-input100">Nombre Evento*</span>
				<input type="text" id="eventname" className="input100" placeholder="Ponle un nombre" title="Sin nombre nadie sabra que es"
					{...register("name")} required />
				<p className="error-message">{errors.name?.message}</p>
			</div>

			<div className="wrap-input100 bg1 rs1-wrap-input100">
				<span className="label-input100">Telefono</span>
				<input type="number" className="input100" placeholder="Ingresa un numero telefonico" min="0" pattern="^[0-9]+"
					title="Como te contactamos" ng-model="per.phone" {...register("contactNumber")} required />
				<p className="error-message">{errors.contactNumber?.message}</p>
			</div>
			<div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
				<span className="label-input100">Email *</span>
				<input type="email" className="input100" placeholder="Ingresa un Email" ng-model="per.userTempo.correo"
					title="Ingrese su email (e@a.x)"  {...register("contactMail")} required />
				<p className="error-message">{errors.contactMail?.message}</p>
			</div>
			<div className="wrap-input100 bg1 rs1-wrap-input100">
				<span className="label-input100">Lugar</span>
				<SearchAddres className="input100" title="si no nos dices donde es, como esperas que asistamos?"
					placeholder="lugar de desarrollo evento?" required={true} setAddress={setAddress} />
				<p className="error-message">{errors.address?.message}</p>

			</div>
			<div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
				<Col xm={12} sm={12} md={12} lg={12} >

					<span className="label-input100">Categoria *</span>
					<p>Categoria Seleccionada: {watch("categoryName")}</p>
					<p className="error-message">{errors.category?.message}</p>

				</Col>
				<Categories onClick={(e) => {
					setCategory(e);

				}} className={"btn-theme btn-block"}></Categories>

			</div>
			<div className="wrap-input100 bg1 rs1-wrap-input100">
				<span className="label-input100">fecha inicio del evento (no puede iniciar hoy)</span>
				<input id="date" className="input100" type="date" title="tenemos que saber cuando es" name="lugar"
					placeholder="Cuando es el evento?" required {...register("dateEvent")} />
				<p className="error-message">{errors.dateEvent?.message}</p>
			</div>

			<div className="wrap-input100 validate-input bg0 rs1-alert-validate">
				<span className="label-input100">Descripcion.</span>
				<textarea id="description" className="input100" name="descripcion"
					placeholder="Cuentanos, que quieres organizar, resume de que se trata, hablanos de el lugar, las categorias, la premiacion..."
					title="Tenemos que saber que organizas, cuentanos" ng-model="per.description" required {...register("description")}></textarea>
				<p className="error-message">{errors.description?.message}</p>
			</div>
			<div style={{ margin: "auto", marginBottom: "15px", marginTop: "15PX" }}>
				{
					flyer.length === 0 ? <span style={{ color: "red" }}>Flyer necesario</span> : ""
				}


				<label htmlFor="flyer" className="contact100-form-btn">
					<span>
						Flyer / cartel*
						<i className="fa fa-camera-retro" aria-hidden="true"></i>
					</span>
					<input type="file" id="flyer" accept="image/*" style={{ display: "none" }} onChange={(event) => {
						selectFlyer(event)
					}} />
				</label>
				{
					banner.length === 0 ? <span style={{ color: "red" }}>Banner necesario</span> : ""
				}
				<label htmlFor="banner" className="contact100-form-btn">
					<span>
						banner / encabezado*
						<i className="fa fa-camera-retro" aria-hidden="true"></i>
					</span>
					<input type="file" id="banner" accept="image/*" ng-file-model="per.banner" style={{ display: "none" }} onChange={(event) => {
						selectBanner(event)
					}} />
				</label>
			</div>
			<div className="wrap-input100  bg1 rs1-wrap-input100">
				<div className="row">
					<div className="col-lg-6 col-xs-6">
						<h6 style={{ textAlign: "center" }}>Flayer / cartel</h6>
					</div>
					<div className="col-lg-6 col-xs-6">
						<h6 style={{ textAlign: "center" }}>Banner / encabezado</h6>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-xs-6">
						{
							flyer.map((file, index) => {
								let url = URL.createObjectURL(file);
								return <img src={url} alt="" className="img-responsive" />
							})
						}

					</div>
					<div className="col-lg-6 col-xs-6">
						{
							banner.map((file, index) => {
								let url = URL.createObjectURL(file);
								return <img src={url} alt="" className="img-responsive" />
							})
						}
					</div>
				</div>
			</div>
			{/* VERIFICAR CON APPS */}
			<div className="wrap-input100  bg1">
				<label htmlFor="sendsponsor">
					<input ng-model="per.sendsponsor" type="checkbox" name="" id="sendsponsor" />
					¿Cuentas con marcas que te patrocinen?(PROXIMAMENTE)
				</label>

			</div>
			{/* VERIFICAR CON APPS */}

			{/* <div ng-if="per.sendsponsor" className="wrap-input100  bg1">
				<h3 style={{textAlign: "center"}}>Que marcas te patrocinan</h3>
				<br/>
				<span className="label-input100">añade un patrocinador</span>
				<p ng-if=" per.logo == null" style={{color:"red", fontSize: "10px"}}>El logo del patrocinador es necesario</p>
				<h5 ng-if="per.sponsorrepeat" style={{color: "red"}}>Patrocinador ya agregado</h5>

				<ul id="addsponsor" className=" list-group list-group-horizontal">
					<li className="cent list-inline-item">
						<input className="input100" type="text" id="sponsorname" placeholder="Nombra a tu patrocinador"
							ng-model="per.sponsorname" />
					</li>
					<li className="cent list-inline-item">
						<label htmlFor="logosponsor" >
							<span>
								<i className="fa fa-camera-retro addLogo"></i>
							</span>
							<input type="file" accept="image/*" ng-file-model="per.logo" name="logo" id="logosponsor"
								style={{display: "none"}} />
								
								<span ng-if="per.logo != null" style={{color:"black",fontSize: "10px"}}>{"{per.logo.name}"}</span>
								
						</label>
						
					</li>
					<li className="cent list-inline-item">
						<label htmlFor="addponsor">
							<span>
								<i className="fa fa-plus-square addLogo" style={{marginLeft: "18px",marginRight: "-16px"}}>
								</i>
							</span>
							<input type="button" ng-click="per.addSponsor()" name="logo" id="addponsor"
								style={{display: "none"}} />
						</label>

					</li>
				</ul>


				<div id="listSponsor" style={{height: "200px", overflow: "auto"}}>

					<h3 ng-if="per.sponsorlogo.length == 0" style={{textAlign: "center"}}>No cuentas con patrocinadores todavia
					</h3>

					<ul ng-repeat="sponsors in per.sponsorlogo" ng-if="per.sponsorlogo.length != 0" id="addsponsor"
						className=" list-group list-group-horizontal">

						<li className="cent list-inline-item">
							<span className="label-input100">{"{sponsors.nombre}"}</span>
						</li>
						<li className=" dropdown mega-avatar cent list-inline-item">
							<img src="{{sponsors.imagen.url}}" style={{width: "40px", height: "100%"}} alt="..."
								className="img-thumbnail" />
						</li>
						<li className="cent list-inline-item">
							<label htmlFor="removesponsor{{$index}}">
								<span>
									<i className="fa fa-remove addLogo" style={{marginLeft: "18px", marginRight: "-16px"}}>
									</i>
								</span>
								<input type="button" ng-click="per.removeSponsor(sponsors)" name="logo"
									id="removesponsor{{$index}}" style={{display:"none"}} />
							</label>

						</li>

					</ul>
				</div>
			</div> */}

			<div className="wrap-input100  bg1">
				<label htmlFor="sendProduct">
					<input ng-model="per.sendProduct" type="checkbox" name="" id="sendProduct" />
					¿Vendes Productos exclusivos del evento? (PROXIMAMENTE)
				</label>

			</div>
			{/* <div ng-if="per.sendProduct" className="col-sm-6" style={{borderLeft:"0px", borderRight: "0px"}}>

				<div className="wrap-input100  bg1" style={{borderLeft:"0px", borderRight: "0px"}}>
				<h5 ng-if="per.productorepeat" style={{color: "red"}}>Producto ya agregado</h5>
				<p ng-if=" per.producto == null" style={{color:"red", fontSize: "10px"}}>Agrega una foto del producto</p>
				
					<ul id="addproducto" className=" list-group list-group-horizontal">
						<li className="cent list-inline-item">
							<input className="input100" type="text" id="productoname" placeholder="Producto"
								ng-model="per.productoname" />
						</li>
						<li className="cent list-inline-item">
							<input className="input100" type="number" min="0" pattern="^[0-9]+" id="productoprecio" placeholder="Precio"
								ng-model="per.productoprecio" />
						</li>
						<li className="cent list-inline-item">
							<label htmlFor="imgproducto">
								<span>
									<i className="fa fa-camera-retro addLogo"></i>
								</span>
								<input type="file" accept="image/*" ng-file-model="per.producto" name="producto"
									id="imgproducto" style={{display: "none"}} />
								<span ng-if="per.producto != null" style={{color:"black", fontSize: "10px"}}>{"{per.producto.name}"}</span>
                            </label>
						</li>
							
						<li className="cent list-inline-item">
							<label htmlFor="removeproducto">
								<span>
									<i className="fa fa-plus-square addLogo" style={{marginLeft: "18px", marginRight: "-16px"}}>
									</i>
								</span>
								<input type="button" ng-click="per.addProducto()" name="producto" id="removeproducto"
									style={{display: "none"}} />
							</label>


						</li>
					</ul>
				</div>
			</div> 
            <div ng-if="per.sendProduct" className="col-sm-6"
				style={{overflow:"auto", height: "200px", borderLeft:"0px", borderRight: "0px"}}>
                    <div className="wrap-input100  bg1" style={{borderLeft:"0px", borderRight: "0px"}}>
				<h3 ng-if="per.productoventa.length == 0" style={{textAlign: "center"}}>No cuentas con productos todavia</h3>

				<ul ng-repeat="producto in per.productoventa" ng-if="per.productoventa.length != 0" id="addsponsor"
					className=" list-group list-group-horizontal">

					<li className="cent list-inline-item">
						<span className="label-input100">{"{producto.nombre}"}</span>
					</li>
					<li className="cent list-inline-item">
						<span className="label-input100">{"{producto.precio}"}</span>
					</li>
					<li className=" dropdown mega-avatar cent list-inline-item">
						<img src="{{producto.imagen.url}}" style={{width: "40px", height: "100%;"}} alt="..."
							className="img-thumbnail"/>
					</li>
					<li className="cent list-inline-item">
						<label htmlFor="removesponsor{{$index}}">
							<span>
								<i className="fa fa-remove addLogo" style={{marginLeft: "18px", marginRight: "-16px"}}>
								</i>
							</span>
							<input type="button" ng-click="per.removeProducto(producto)" name="logo"
								id="removesponsor{{$index}}" style={{display: "none"}} />
						</label>

					</li>

				</ul>
                </div>
			</div>
			*/}
			<div className="wrap-input100 validate-input bg1">
				<h3 style={{ textAlign: "center" }}>Boleteria</h3>
				<span className="label-input100">Descripción boleta*</span>
				<input type="text" id="descBoleta" className="input100" placeholder="ej. Vip / categoria#1"
					{...register("descBoleta")} />
				<span className="label-input100">Valor boleta*</span>
				<input type="number" min="0" pattern="^[0-9]+" className="input100" placeholder="valor" id="valorBoleta" {...register("valorBoleta")} />

				<label htmlFor="addboleta" className="contact100-form-btn">
					<span>
						Agregar boleta
						<i className="fa fa-plus" aria-hidden="true"></i>
					</span>
					<input type="button" id="addboleta" onClick={() => addBoleta()} value="" style={{ display: "none" }} />
				</label>
			</div>
			{
				boletas.length === 0 ?
					<div className="wrap-input100 bg1 ">
						<h3 style={{ textAlign: "center" }}>No has agregado ninguna boleta</h3>

					</div>
					:
					boletas.map((boleta,index)=>{
						return <div
						className="wrap-input100 bg1 rs1-wrap-input100"
						data-validate="si no nos dices cuanto vale no sabremos cuanto cobrar">
						<button type="button" className="close" onClick={()=>{
							removerBoleta(boleta)
						}} aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<span className="label-input100">Boleta {index +1}</span>
						<h6>{boleta.desc}</h6>
						<h3>{boleta.value}</h3>

					</div>
					})
					
			}
			{
				!isSend?<button className="contact100-form-btn">
				<span>
					Generar evento
				</span>
			</button>
			:
			<button  className="contact100-form-btn" disabled>
				<span>
					<span style={{ width: "1.5em", height: "1.5em" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Generando evento
				</span>
			</button>
			}
			
			
		</form>
	</div>;
}