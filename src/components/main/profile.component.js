import React from "react";
import { AuthContext } from "../../auth/Auth.provider";
import { Col, Container, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import axiosInstance from "../../services/axios.service";
import PostPreview from "./post/postPreview.component";
import SuggestedUser from "./users/suggestedUser.component";
class Profile extends React.Component {
    static contextType = AuthContext;
    state = {
        user: this.context.user,
        myPosts: [],
        filteredPost:[],
        portadaPost: null,
        following: false,
        currentUser: true,
        followers:[],
        followings:[]
    }
    componentDidMount() {
        const id_user = this.props.match.params.user_id;
        if (id_user !== undefined) {
            axiosInstance.get("users/getUser/" + id_user).then(res => {
                if (res.status === 200) {
                    this.setState({ user: res.data.user, currentUser: false }, () => {
                        this.getUserPosts()
                        this.getUserFollowers()
                        this.getUserFollowing()
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            this.getPosts()
            this.getUserFollowers()
        this.getUserFollowing()
        }
        
        
    }
    render() {
        return <div>

            {

                this.state.user.profile_type === 0 ?
                    <div className="user-profile">
                        <Container fluid>
                            <Row>
                                {
                                    this.state.portadaPost === null ?
                                        <div className="profilebox" style={{ background: "linear-gradient( rgba(34,34,34,0.6), rgba(34,34,34,0.6)),  no-repeat", backgroundSize: "cover", backgroundPosition: "center center", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover" }}>
                                        </div>
                                        :
                                        this.state.multimedia?.multimedia !== null ?
                                            this.state.multimedia?.extension !== "mp4" ?
                                                <div className="profilebox" style={{ background: "linear-gradient( rgba(34,34,34,0.6), rgba(34,34,34,0.6)), url('" + process.env.REACT_APP_BASE_URL + this.state.multimedia?.multimedia + "') no-repeat", backgroundSize: "cover", backgroundPosition: "center center", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover" }}>
                                                </div>
                                                :
                                                <video className="profilebox" style={{ opacity: "0.5", background: " linear-gradient( rgba(34,34,34,0.6), rgba(34,34,34,0.6))", backgroundSize: "cover", backgroundPosition: " center center", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover" }} onloadedmetadata="this.muted = true" volume="0" src={process.env.REACT_APP_BASE_URL + this.state.multimedia?.multimedia}
                                                    preload="metadata" muted autoplay loop></video>
                                            :
                                            <div className="profilebox" style={{ background: "linear-gradient( rgba(34,34,34,0.6), rgba(34,34,34,0.6)),  no-repeat", backgroundSize: "cover", backgroundPosition: "center center", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover" }}>
                                            </div>
                                }
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12} xm={12}>
                                    <div className="post-content">
                                        <div className="author-post text-center">
                                            <img className="img-fluid img-circle" src={process.env.REACT_APP_BASE_URL + this.state.user.profile_img} ng-model="user"
                                                alt="Image" />
                                            <div className="content-box">
                                                <h4>{this.state.user.name}</h4>
                                                <p>{this.state.user.description}</p>
                                            </div>
                                            {
                                                this.state.currentUser ?
                                                    <Link to="/editProfile"
                                                        className="dropdown-header">Editar
                                                        Perfil</Link>
                                                    :
                                                    !this.state.following ?
                                                        <a href onClick={this.follow}

                                                            className="dropdown-header">Seguir</a>
                                                        :
                                                        <a href
                                                            className="dropdown-header">Siguiendo</a>
                                            }
                                            {
                                                !this.state.currentUser ?
                                                    <Link to={"messages/" + this.state.user.id}
                                                        className="dropdown-header">Enviar
                                                        mensaje</Link>
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="home-menu">
                                <div className="menu-category">
                                    <ul className="menu">
                                        <li className="current-menu-item">
                                            <a>Publicaciones <span>{this.state.myPosts.length}</span></a>
                                        </li>
                                        <li className="current-menu-item">
                                            <Link to={"/followers/"+(!this.state.currentUser?this.state.user.id:"")}>Seguidores <span>{
                                                this.state.followers.length}</span></Link>
                                        </li>
                                        <li className="current-menu-item">
                                            <Link to={"/following/"+(!this.state.currentUser?this.state.user.id:"")}>Siguiendo <span>{
                                                this.state.followings.length}</span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </Row>
                            <Row className="newsfeed">
                                {
                                    this.state.myPosts.length === 0 ?
                                        <h1 className="d-flex justify-content-center">No hay Publicaciones</h1>
                                        :
                                        this.state.myPosts.map(post => {
                                            return <PostPreview key={post.id} post={post} type={"Profile1"} />
                                        })
                                }
                            </Row>
                        </Container>
                    </div>
                    :
                    <div className="profile-two ">
                        <Container fluid>
                            <Row className="newsfeed">
                                <Col lg={3} md={3} sm={3}>
                                    <aside className="sidebar">
                                        <ul className="list">
                                            <li>
                                                <div className="user-info">
                                                    <div className="image">
                                                        <a>
                                                            <img src={process.env.REACT_APP_BASE_URL + this.state.user.profile_img} className="img-responsive img-circle"
                                                                style={{ margin: "auto" }} alt="User" />
                                                        </a>
                                                    </div>
                                                    <div className="detail">
                                                        <h4>{this.state.user.name}</h4>
                                                        <small>{this.state.user.nickname}</small>
                                                        {
                                                            this.state.currentUser ?
                                                                <h6>
                                                                    <Link to="/editProfile"
                                                                        className="dropdown-header">Editar
                                                                        Perfil</Link>
                                                                </h6>
                                                                :
                                                                <h6>
                                                                    {
                                                                        !this.state.following ?
                                                                            <a href onClick={this.follow}

                                                                            >Seguir</a>
                                                                            :
                                                                            <a href
                                                                            >Siguiendo</a>
                                                                    }
                                                                </h6>
                                                        }
                                                        {
                                                            this.state.currentUser ?
                                                                <h6><a href="/generateEvent"
                                                                > Generar Evento</a>
                                                                </h6>
                                                                : ""
                                                        }
                                                        {
                                                            this.state.currentUser ?
                                                                <h6><a href="/generateProduct"
                                                                > Generar Producto</a>
                                                                </h6>
                                                                : ""
                                                        }
                                                        {
                                                            !this.state.currentUser ?
                                                                <h6><Link to={"messages/" + this.state.user.id}> Enviar mensaje</Link>
                                                                </h6>
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <small className="text-muted">
                                                    <Link
                                                        to={"/followers/"+(!this.state.currentUser?this.state.user.id:"")}>{
                                                            this.state.followers.length}  Seguidores <em className="fa fa-angle-right pull-right"></em>
                                                    </Link>
                                                </small>
                                                <br />
                                                <small className="text-muted">
                                                    <Link
                                                        to={"/following/"+(!this.state.currentUser?this.state.user.id:"")}>{
                                                            this.state.followings.length}  Seguidos<em
                                                            className="fa fa-angle-right pull-right"></em>
                                                    </Link>
                                                </small>
                                                <hr />
                                                <small className="text-muted">Descripción: {this.state.user.description} </small>
                                                <p>{this.state.user.address}</p>
                                                <hr />
                                                <small className="text-muted">Website: </small>
                                                <a href={this.state.user.web_page}>
                                                    <p>{this.state.user.web_page} </p>
                                                </a>
                                                <hr />
                                            </li>
                                        </ul>
                                    </aside>
                                </Col>
                                <Col lg={6} md={6} sm={12} >
                                    <div style={{ background: "#fff" }}>
                                        <ul className="list-group list-group-horizontal">
                                            <li className="cent list-inline-item">
                                                <a href onClick={this.seePost} style={{ color: "#FF9900", textAlign: "center" }}> Publicaciones</a>
                                            </li>
                                            <li className="cent list-inline-item">
                                                <a href
                                                    onClick={this.seeEvent} style={{ color: "#FF9900", textAlign: "center" }}> Eventos</a>
                                            </li>

                                        </ul>
                                    </div>

                                    {
                                    this.state.filteredPost.length === 0 ?
                                        <h1 className="d-flex justify-content-center" >No hay Publicaciones</h1>
                                        :
                                        this.state.filteredPost.map(post => {
                                            return <PostPreview key={post.id} post={post} type={"Profile2"} />
                                        })
                                }
                                </Col>
                                {
                                    this.props.match.params.user_id === undefined?<Col lg={3} md={3} sm={12}>
                                    <div className="suggestion-box full-width">
                                        <div className="suggestions-list" style={{ overflow: "auto", whiteSpace: "nowrap", height: " 300px" }}>
                                            <SuggestedUser design="Home" />
                                        </div>
                                    </div>
                                </Col>:""
                                }
                                
                            </Row>
                        </Container>
                    </div>
            }</div>;
    }

    getUserFollowers = ()=>{
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("users/getFollowers",sendData).then(res=>{
            if(res.status === 200){
                this.setState({followers: res.data.users},()=>{
                    this.isFollowing()
                })
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    getUserFollowing = ()=>{
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("users/getFollowings",sendData).then(res=>{

            if(res.status === 200){
                this.setState({followings: res.data.users})
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    follow = () => {

        let sendData = {
            id: this.context.user.id,
            id_follow: this.state.user.id
        }
        console.log(sendData);
        axiosInstance.post("users/followUser", sendData).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({following:true})
            }
        }).catch(error => {
            console.log("error follow", error);

        })
    }
    getPosts = () => {
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("post/myPosts", sendData).then(res => {
            if (res.status === 200) {
                this.setState({ myPosts: res.data.posts ,filteredPost:res.data.posts}, () => {

                    if (this.state.myPosts.length > 0) {
                        this.setState({ portadaPost: this.state.myPosts[0] },()=>{
                            this.getportada()
                        })

                    }
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }
    getportada = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.state.portadaPost?.id
        }
        axiosInstance.post("/post/getMultimedia", sendData).then(res => {
            if (res.status === 200) {
                let multimedia = res.data.multimedia
                if(multimedia.length >0){
                    this.setState({ multimedia: multimedia[0] })
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }
    getUserPosts = () => {
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("post/getPostsbyUser", sendData).then(res => {
            if (res.status === 200) {
                this.setState({ myPosts: res.data.posts ,filteredPost:res.data.posts}, () => {

                    if (this.state.myPosts.length > 0) {

                        this.setState({ portadaPost: this.state.myPosts[0] },()=>{
                            
                            this.getportada()
                        })
                    }
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }
    seePost = () => {
        let post = this.state.myPosts.filter(post => post.postType === 1)
        this.setState({ filteredPost: post })
    }

    seeEvent = () => {
        let post = this.state.myPosts.filter(post => post.postType === 2)
        this.setState({ filteredPost: post})
    }

    isFollowing =()=>{
        this.state.followers.map(isMe=>{
            if(this.context.user.id === isMe.id){
                this.setState({following:true})
            }
        })
    }
}

export default withRouter(Profile);