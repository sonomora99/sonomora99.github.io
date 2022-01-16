import React from "react";
import { Col } from "react-bootstrap";
import { Link} from "react-router-dom";
import { AuthContext } from "../../../auth/Auth.provider";
import axiosInstance from "../../../services/axios.service";

class UserView extends React.Component {
    static contextType = AuthContext;

    state = {
        
        user: this.context.user,
        reload: {
            "Home": "/",
            "Explore": "/explore",
            "follow": "/follow",
            "profile": "/profile"
        }
    }

    designUser= {
        "Home": <div className="suggestion-body">
            <Link to={"/profile/"+(this.props.user.id!==this.state.user.id?this.props.user.id:"")} >
                <img className="img-responsive img-circle" src={process.env.REACT_APP_BASE_URL + this.props.user.profile_img} alt="User imgProfile" />
                <div className="name-box">
                    <h4>{this.props.user.name}</h4>
                    <span>{this.props.user.nickname}</span>
                </div></Link>
            <span><a onClick={() => {
                this.follow()
            }}><i className="fa fa-plus"></i></a></span>
        </div>,
        "Explore": <Col lg={3} md={3} sm={12}>
            <div className="tr-section">
                <Link to={"profile/"+(this.props.user.id!==this.state.user.id?this.props.user.id:"")}>
                    <div className="tr-post">
                        <div className="entry-header">
                            <div className="entry-thumbnail">
                                <img className="img-fluid" src={process.env.REACT_APP_BASE_URL + this.props.user.profile_img} alt="Image" />
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="author-post text-center">
                                <Link to={"/profile/"}><img className="img-fluid rounded-circle" src={process.env.REACT_APP_BASE_URL + this.props.user.profile_img} alt="Image" /></Link>
                            </div>
                            <div className="card-content">
                                <h4>{this.props.user.name}</h4>
                                <span>{this.props.user.nickname}</span>
                            </div>

                        </div>
                    </div>
                </Link>
                <a href onClick={() => {
                    this.follow()
                }} className="kafe-btn kafe-btn-mint-small full-width"> Seguir
                </a>
            </div>
        </Col>,
        "follow": <Link to={"/profile/"+(this.props.user.id!==this.state.user.id?this.props.user.id:"")}>
            <div className="followers-body">
            
                <img className="img-responsive img-circle" src={process.env.REACT_APP_BASE_URL + this.props.user.profile_img}/>
                <div className="name-box">
                    <h4>{this.props.user.name}</h4>
                    <span>{this.props.user.nickname}</span>
                </div>
                
            
        </div>
        </Link>,
        "chat": <div>Diseño de usuario para el chat</div>,
    }

    
    componentDidMount() {
    }

    reloadList = () => {

        console.log("reload  parent");
        this.props.reloadList(this.props.user);
    }
    follow = () => {

        let sendData = {
            id: this.state.user.id,
            id_follow: this.props.user.id
        }
        axiosInstance.post("users/followUser", sendData).then(res => {
            if (res.status === 200) {
                this.reloadList()
            }
        }).catch(error => {
            console.log("error follow", error);

        })
    }
    render() {
        return this.designUser[this.props.design];
    }




}

export default UserView;