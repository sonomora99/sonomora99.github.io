import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment';
import axiosInstance from "../../../services/axios.service";
import { AuthContext } from "../../../auth/Auth.provider";

class PostPreview extends React.Component {
    static contextType = AuthContext;

    state = {
        type: this.props.type,
        reaction: 0,
        comments: 0,
        multimedia:[],
        user: this.context.user,
    }
    search =()=>{
        console.log("entra");
    }
    getReactions = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.props.post.id
        }
        axiosInstance.post("/post/getReactions", sendData).then(res => {
            if (res.status === 200) {
                this.setState({ reaction: res.data.reactions.length })
            }
        }).catch(error => {
            console.log(error);
        })
    }
    getcomments = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.props.post.id
        }
        axiosInstance.post("/post/getComments", sendData).then(res => {
            if (res.status === 200) {
                this.setState({ comments: res.data.comments.length })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    getMultimedia = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.props.post.id
        }
        axiosInstance.post("/post/getMultimedia", sendData).then(res => {
            if (res.status === 200) {
                let multimedia = res.data.multimedia
                if(multimedia.length >0){
                    this.setState({ multimedia: multimedia })
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }


    reactEvent = () => {
        // axiosInstance.


    }
    componentDidMount() {
        this.getReactions()
        this.getMultimedia()
        this.getcomments()
    }

    customToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <em className="fa fa-ellipsis-h" style={{ color: "#ff9900" }}></em>
        </a>
    ));

    customMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {


            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                child.props.children.toLowerCase(),
                        )}
                    </ul>
                </div>
            );
        },
    );
    





    render() {
        const posts = {
            "Home": <div className="cardbox">
                <div className="cardbox-heading">
                    <Dropdown className="pull-right" >
                        <Dropdown.Toggle as={this.customToggle} />
    
    
                        <Dropdown.Menu as={this.customMenu} >
                        {/* <Dropdown.Menu as={this.customMenu} style={{ transform: "translate(0px, 16px) !important" }}> */}
                            <Dropdown.Item href="#/action-1">Esconder Post</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Dejar de seguir</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Reportar Contenido</Dropdown.Item>
                        </Dropdown.Menu>
    
                    </Dropdown>
    
                    <div className="media m-0">
                        <div className="d-flex mr-3">
                            <Link to={"/profile/" + (this.props.post.user.id!==this.state.user.id?this.props.post.user.id:"")}>
                                <img className="img-responsive img-circle" src={process.env.REACT_APP_BASE_URL + this.props.post.user.profile_img}
                                    alt="User" />
                            </Link>
    
                        </div>
                        <div className="media-body">
                            <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                                {/* <p className="m-0">{"{ evento.nom_evento }"} - {"{ evento.nombre }"}</p> */}
                                <small><span>{
                                    moment(this.props.post.updatedAt, "YYYYMMDD").fromNow()
                                }</span></small>
                                <p className="m-0">{this.props.post.description}</p>
                            </Link>
                            {/* <a href="#!post/{{evento.nickname}}/{{evento.cod_evento}}" >
                                <p className="m-0">{"{ evento.nom_evento }"} - {"{ evento.nombre }"}</p>
                                <small><span>{"{ evento.f_evento_editado }"}</span></small>
                                <p className="m-0">{"{ evento.descripcion }"}</p>
                            </a> */}
                        </div>
                    </div>
    
                </div>
                {
                    
                        this.state.multimedia.length!== 0?
                        this.state.multimedia[0].multimedia != null ?
                        <div className="cardbox-item">
                            <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                                {
                                    this.state.multimedia[0].extension != "mp4" ? <img className="img-responsive"
                                        src={process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia} alt="MaterialImg" /> : <video className="img-responsive " volume="0" src={process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia} preload="metadata" autoPlay muted ></video>
                                }
    
                            </Link>
                        </div> : ""
                        :""
                }
                {/* GENTE QUE LE DA LIKE */}
                {/* <div className="cardbox-base">
                    <ul>
                        <li><a href="#"><img src="assets/img/users/1.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/2.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/3.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/4.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/5.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/6.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/7.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/8.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/9.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                        <li><a href="#"><img src="assets/img/users/10.jpg" className="img-responsive img-circle"
                            alt="User"></a></li>
                    </ul>
                </div>  */}
    
                <div className="cardbox-like">
                    <ul>
                        <li>
                            <a onClick={this.reactEvent}>
                                <i className="fa fa-heart" style={{ color: "#ff9900" }} ></i>
                            </a>
                            <span style={{ color: "#FF9900" }}>{this.state.reaction}</span>
                        </li>
                        <li>
                            <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                                <i className="fa fa-comments" style={{ color: "#858686" }} ></i>
                            </Link>
                            <span
                                className="span-last" style={{ color: "#858686" }}>{this.state.comments}</span>
                        </li>
                    </ul>
                </div>
            </div>,
            "Explore": <Col lg={4} md={4} sm={12} xs={12} >
    
                <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                    {
                         this.state.multimedia.length!== 0?
                         this.state.multimedia[0].multimedia != null ?
                            this.state.multimedia[0].extension != "mp4" ?
                                <div className="explorebox" style={{
                                    background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('" + process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia + "') no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: " center center",
                                    webkitBackgroundSize: "cover",
                                    MozBackgroundSize: " cover",
                                    OBackgroundSize: "cover"
                                }}>
                                    <div className="explore-top">
                                        <div className="explore-like"><i className="fa fa-heart" style={{ color: "#FF9900  !important" }}></i> <span>{this.state.reaction}</span></div>
                                        {/* <div className="explore-circle pull-right"><i className="far fa-bookmark"></i></div>  */}
                                    </div>
                                    <div className="explore-body">
                                        <div className=""><img className="img-circle" src={process.env.REACT_APP_BASE_URL + this.props.post.user.profile_img} alt="user" /></div>
                                    </div>
                                </div>
                                :
    
                                <div className="explorebox" >
    
                                    <div className="explore-top" style={{ position: "absolute", zIndex: "1000" }}>
                                        <div className="explore-like"><i className="fa fa-heart" style={{ color: "#FF9900  !important" }}></i> <span>{this.state.reaction}</span></div>
                                        {/* <!-- <div className="explore-circle pull-right"><i className="far fa-bookmark"></i></div> --> */}
                                    </div>
                                    <div className="explore-body" style={{ position: "absolute", marginTop: "41px", zIndex: "10000" }}>
                                        <div className=""><img className="img-circle" src={process.env.REACT_APP_BASE_URL + this.props.post.user.profile_img} alt="user" /></div>
                                    </div>
                                    <video className="explorebox" onloadedmetadata="true" volume="0" src={process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia} style={{opacity: "0.7", height: "auto", backgroundColor: "rgba(34,34,34,1)", minWidth: "100%", minHeight: "100%"}} preload="metadata" autoplay muted >
                                    </video>
                                </div>
                            :
                            <div className="explorebox" style={{
                                background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('../../../assets/img/no-found.png') no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                webkitBackgroundSize: "cover",
                                MozBackgroundSize: "cover",
                                OBackgroundSize: "cover"
                            }}>
                                <div className="explore-top">
                                    <div className="explore-like"><i className="fa fa-heart" style={{ color: "#FF9900  !important" }}></i> <span>{this.state.reaction}</span></div>
                                    {/* <div className="explore-circle pull-right"><i className="far fa-bookmark"></i></div> */}
                                </div>
                                <div className="explore-body">
                                    <div className=""><img className="img-circle" src={process.env.REACT_APP_BASE_URL + this.props.post.user.profile_img} alt="user" /></div>
                                </div>
                            </div>
                         :
                         ""
                        
    
    
    
                    }
    
                </Link>
            </Col>,
            "Profile1": <Col lg={4} md={4} sm={12} xs={12}>
            <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                <div className="explorebox">
                    {
                         this.state.multimedia.length!== 0?
                        this.state.multimedia[0].multimedia != null ?
                        this.state.multimedia[0].extension != "mp4" ?
                        <div className="explorebox"  style={{background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('" + process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia + "') no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        WebkitBackgroundSize: "cover",
                        MozBackgroundSize: "cover",
                        OBackgroundSize: "cover"}}>
                               <div className="explore-top">
                                   <div className="explore-like"><i className="fa fa-heart" style={{color:"#FF9900"}}></i>
                                       <span>{this.state.reaction}</span></div>
                               </div>
                           </div>
                            :
                            <div className="explorebox">
    
                        		<div className="explore-top" style={{position:" absolute", ZIndex: "10000"}}>
                        			<div className="explore-like"><i className="fa fa-heart"
                        					style={{color:"#FF9900"}}></i> <span>{this.state.reaction}</span></div>
                                    
                        		</div>
    
                        		<video  className="explorebox" onloadedmetadata="true" volume="0" src={process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia}
                        			style={{opacity: "0.7", height: "auto", backgroundColor: "rgba(34,34,34,1)", minWidth: "100%", minHeight: "100%"}}
                        			preload="metadata" autoplay muted>
                        		</video>
                        	</div>
                        :
                        <div className="explorebox" style={{background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('../../../assets/img/no-found.png') no-repeat",
                         backgroundSize: "cover",
                         backgroundPosition:" center center",
                         WebkitBackgroundSize:" cover",
                         MozBackgroundSize:" cover",
                         OBackgroundSize: "cover"}}>
                        		<div className="explore-top">
                        			<div className="explore-like"><i className="fa fa-heart" style={{color:"#FF9900"}}></i> <span>{this.state.reaction}</span>
                        			</div>
                        		</div>
                        	</div>
                         :""
                      
                    }
                </div>
            </Link>
        </Col>,
            "Profile2": <Col lg={6} md={6} sm={6} xs={6}>
            <Link to={"/post/" + this.props.post.user.nickname + "/" + this.props.post.id}>
                <div className="explorebox">
                    {
                         this.state.multimedia.length!== 0?
                        this.state.multimedia[0].multimedia != null ?
                        this.state.multimedia[0].extension != "mp4" ?
                        <div className="explorebox"  style={{background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('" + process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia + "') no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        WebkitBackgroundSize: "cover",
                        MozBackgroundSize: "cover",
                        OBackgroundSize: "cover"}}>
                               <div className="explore-top">
                                   <div className="explore-like"><i className="fa fa-heart" style={{color:"#FF9900"}}></i>
                                       <span>{this.state.reaction}</span></div>
                               </div>
                           </div>
                            :
                            <div className="explorebox">
    
                        		<div className="explore-top" style={{position:" absolute", ZIndex: "10000"}}>
                        			<div className="explore-like"><i className="fa fa-heart"
                        					style={{color:"#FF9900"}}></i> <span>{this.state.reaction}</span></div>
                                    
                        		</div>
    
                        		<video  className="explorebox" onloadedmetadata="true" volume="0" src={process.env.REACT_APP_BASE_URL + this.state.multimedia[0].multimedia}
                        			style={{opacity: "0.7", height: "auto", backgroundColor: "rgba(34,34,34,1)", minWidth: "100%", minHeight: "100%"}}
                        			preload="metadata" autoplay muted>
                        		</video>
                        	</div>
                        :
                        <div className="explorebox" style={{background: "linear-gradient( rgba(34,34,34,0.2), rgba(34,34,34,0.2)), url('../../../assets/img/no-found.png') no-repeat",
                         backgroundSize: "cover",
                         backgroundPosition:" center center",
                         WebkitBackgroundSize:" cover",
                         MozBackgroundSize:" cover",
                         OBackgroundSize: "cover"}}>
                        		<div className="explore-top">
                        			<div className="explore-like"><i className="fa fa-heart" style={{color:"#FF9900"}}></i> <span>{this.state.reaction}</span>
                        			</div>
                        		</div>
                        	</div>
                         :
                        ""
                        
                    }
                </div>
            </Link>
        </Col>,
    
        }
        return posts[this.state.type]
    }


}

export default PostPreview;