import moment from "moment";
import React from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import '../assets/css/demos/photo.css';
import spotsImage from "../assets/spotsLogo2.png";
import { AuthContext } from '../auth/Auth.provider';
import axiosInstance from "../services/axios.service";
import { BASE_URL } from "../variables";

class MainNavbar extends React.Component {
    static contextType = AuthContext;
    state = {
        user: this.context.user,

        logOut: this.context.logOut
    }

    logout = () => {
        this.state.logOut()
    }
    

    showNotification = (notification)=>{
        let data = {
            idNotification:notification.id
        }
        axiosInstance.post("/users/showNotification",data).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.error(error);
        })
    }
    render() {
        const notification = <div>
            <i className="fa fa-bell noti-icon"></i>
            {
                this.context.numNotifications > 0 ?
                    <span
                        className="badge badge-danger badge-pill noti-icon-badge" >{this.context.numNotifications}</span>
                    : ""
            }
        </div>
        return <div className="tr-header">
            <Navbar className="navbar-default">
                <Container fluid >
                    <div className="navbar-header">
                        <img className="imgLogo mx-auto d-block" width="50px" height="50px" src={spotsImage} alt="..." />
                    </div>
                    <div className="navbar-right">
                        <ul style={{ marginBottom: "0px" }} className="nav navbar-nav list-inline list-group list-group-horizontal ">
                            <li className=" notification-list mx-auto d-block list-inline-item">
                                <NavDropdown title={notification}>

                                    {

                                        this.context.notifications.map((notification) => {
                                            console.log(notification);
                                            return <NavDropdown.Item >

                                                <Link to={notification.link} onClick={()=>{
                                                    this.showNotification(notification)
                                                }}>
                                                    <div className="followers-body">
                                                        <div className="suggestion-box  full-width">
                                                            <div className="suggestion-body" style={{backgroundColor:notification.viewed==0?"#ff990063":"white"}}>
                                                                <img className="img-responsive img-circle" style={{ width: "12%" }} src={BASE_URL + notification.user.profile_img} />
                                                                <div className="name-box">
                                                                    <h4>{notification.notification}</h4>
                                                                    <span>{moment(notification.updatedAt, "YYYYMMDD").fromNow()}</span>
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </Link>
                                            </NavDropdown.Item>

                                        })
                                    }

                                </NavDropdown>
                                <Link className="nav-link dropdown-toggle" to="/notifications" role="button"
                                    aria-haspopup="false" aria-expanded="false">


                                </Link>

                            </li>

                            <li className="dropdown notification-list list-inline-item">
                                <Link className="nav-link dropdown-toggle arrow-none waves-effect" to="/chat"
                                    role="button" aria-haspopup="false" aria-expanded="false">
                                    <i className="fa fa-envelope noti-icon"></i>
                                    <span ng-if="mu.totalMensajes != 0"
                                        className="badge badge-success badge-pill noti-icon-badge" ng-bind="mu.totalMensajes"></span>
                                </Link>

                            </li>

                            <li className=" mega-avatar list-inline-item">
                                <span className="avatar w-32 nav-link  arrow-none waves-effect" style={{ paddingTop: "15px", paddingBottom: "15px" }}><img
                                    className=" img-circle" src={BASE_URL + this.state.user?.profile_img} width="25" height="25" alt="..." />

                                </span>


                            </li>
                            <li className="dropdown mega-avatar list-inline-item">
                                <NavDropdown style={{ paddingTop: "15px", }}>
                                    <NavDropdown.Item onClick={this.logout}  >
                                        <h5 >Salir</h5>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>
                        </ul>

                    </div>
                </Container>
            </Navbar>
            <div className="nav-sec">
                <div className="d-flex justify-content-between">
                    <NavLink exact style={{ textDecoration: 'none' }} to="/" activeClassName="mint-green" className="p-2 nav-icon-lg clean-black">
                        <div className="nav-icon"  ><em className="fa fa-home"></em>
                            <span>Inicio</span>
                        </div>
                    </NavLink>
                    <NavLink exact style={{ textDecoration: 'none' }} to="/explore" activeClassName="mint-green" className="p-2 nav-icon-lg ">
                        <div className="nav-icon"  ><em className="fa fa-search"></em>
                            <span>Comunidad</span>
                        </div>
                    </NavLink>
                    <NavLink exact style={{ textDecoration: 'none' }} to="/stories" activeClassName="mint-green" className="p-2 nav-icon-lg clean-black">
                        <div className="nav-icon"  ><em className="fa fa-crosshairs"></em>
                            <span>Historias</span>
                        </div>
                    </NavLink>
                    <NavLink exact style={{ textDecoration: 'none' }} to="/profile" activeClassName="mint-green" className="p-2 nav-icon-lg ">
                        <div className="nav-icon"  ><em className="fa fa-user"></em>
                            <span>Perfil</span>
                        </div>
                    </NavLink>
                    <NavLink exact style={{ textDecoration: 'none' }} to="/maps" activeClassName="mint-green" className="p-2 nav-icon-lg clean-black">
                        <div className="nav-icon"  ><em className="fa fa-map-marker-alt"></em>
                            <span>Mapa</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>

    }
}

export default MainNavbar;