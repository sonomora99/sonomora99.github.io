import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../auth/Auth.provider';
import axiosInstance from '../../../services/axios.service';
import '../../../assets/css/demos/photo.css';
import moment from 'moment';
import CommentComponent from './comment.component';


class PostViewComponent extends React.Component {
    static contextType = AuthContext;
    state = {
        user: this.context.user,
        socket:this.context.socket,
        post: {},
        multimedia: [],
        reactions: 0,
        comments: [],
        inscription:0,
        products:[],
        tickets: [],
        sponsors:[],
        isReact:false,
    }
    getReactions = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.state.post.id
        }
        axiosInstance.post("/post/getReactions", sendData).then(res => {

            if (res.status === 200) {
                this.setState({ reactions: res.data.reactions.length })
                let reaction = res.data.reactions.filter(reaction =>reaction.id_user === this.state.user.id)
                if(reaction.length>0){
                    this.setState({isReact:true})
                }else{

                    this.setState({isReact:false})

                }
            }
        }).catch(error => {
            console.log(error);
        })
    }
    getcomments = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.state.post.id
        }
        axiosInstance.post("/post/getComments", sendData).then(res => {
            console.log("comentarios",res);
            if (res.status === 200) {
                this.setState({ comments: res.data.comments })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    getMultimedia = () => {
        const sendData = {
            id: this.state.user.id,
            id_post: this.state.post.id
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

    getTickets =()=>{
        const sendData = {
            id: this.state.user.id,
            id_post: this.state.post.id
        }
        axiosInstance.post("/post/getTickets", sendData).then(res => {
            if (res.status === 200) {
                let tickets = res.data.tickets
                if(tickets.length >0){
                    this.setState({ tickets: tickets })
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }
    getSponsors = ()=>{

    }
    getProducts = ()=>{

    }
    reactEvent = () => {
        const sendData = {
            id: this.state.user.id,
            reaction_to:this.state.post.id,
            typeReaction:1
        }
        axiosInstance.post("/reactions/react",sendData).then(res=>{
            if(res.status === 200){
                console.log(res);
                if(res.data.isReact){
                    if(this.state.user.id !== this.state.post.user?.id){
                        const notification ={
                            notification: this.state.user.nickname+" reaccionó a tu publicacion",
                            link: "/post/"+this.state.post.user?.nickname+"/"+this.state.post.id,
                            viewed:0,
                            id_from:this.state.user.id,
                            id_to:this.state.post.user?.id
                        }

                        this.state.socket.emit("sendNotification",notification)
                    }

                }
            }
            this.getReactions()
        }).catch(error => {
            console.error(error);
        })


    }
    getPost = (post_id) =>{
        const sendData = {
            id: this.state.user.id,
            id_post: post_id
        }

        axiosInstance.post("/post/getPost", sendData).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                let post = res.data.post
                if(post.length>0){
                    this.setState({post:post[0]},()=>{
                        this.getMultimedia()
                        this.getReactions()
                        this.getcomments()
                        this.getSponsors()
                        this.getProducts()
                        this.getTickets()
                        
                    })
                }else{
                    this.props.history.push('/')
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }
    
    componentDidMount() {
        const post_id = this.props.match.params.post_id;
        this.getPost(post_id)
    }
    render() {

        const inscripcion = {
            0:<Link  to={"/registerUser/"+this.state.post.user?.nickname+"/"+this.state.post?.id}  className="kafe-btn kafe-btn-mint-small  btn-sm">
            <i className="fa fa-check-square"></i>
            Inscribete
            </Link>
            ,
            1:<Link to={"/registerUser/"+this.state.post.user?.nickname+"/"+this.state.post?.id} className="kafe-btn kafe-btn-mint-small  btn-sm" style={{background:"#ffe000"}}>
            <i className="fa fa-check-square"></i>  
            preinscrito
            </Link>,
            2:<Link ng-if="(evento.postVer.nickname != mu.user.nickname) && (evento.isInscrito.isInscrito== '1' && (evento.postVer.t_publicacion == '2')) " className="kafe-btn kafe-btn-mint-small  btn-sm" style={{background:"#00ff08"}}>
            <i className="fa fa-check-square"></i>  
            inscrito
            </Link> 
        }
        return <Container fluid style={{ marginTop: "30px" }}>
            <Row className="post">
                <Col lg={8} md={8} sm={12} xs={12} style={{ padding: "0px" }}>
                    
                    <Carousel>
                        {
                            this.state.multimedia.map(multimedia=>{
                                return <Carousel.Item>
                                {
                                    multimedia.multimedia !== null?
                                        multimedia.extension !== "mp4"?
                                        <img  className="d-block w-100" src={ process.env.REACT_APP_BASE_URL + multimedia.multimedia} alt="First slide"/>
                                        :<video className="d-block w-100" src={ process.env.REACT_APP_BASE_URL + multimedia.multimedia} controls preload="metadata"></video>
                                    :
                                    ""
                                   
                                }
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            })
                        }
                        
                        
                    </Carousel>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <div className="modal-meta-pop">
                        <div className="img-poster clearfix">
                            <Link to={"/profile/"+ (this.state.post.user?.id!==this.state.user.id?this.state.post.user?.id:"")} >
                                <img className="img-circle" width="37px" src={process.env.REACT_APP_BASE_URL+this.state.post.user?.profile_img} />
                            </Link>
                            <strong><Link to={"/profile/"+ (this.state.post.user?.id!==this.state.user.id?this.state.post.user?.id:"")}>
                                <span className="m-">{this.state.post.user?.name}</span>
                            </Link></strong>
                            <span className="m-0 flex justify-right"> {moment(this.state.post.updatedAt, "YYYYMMDD").fromNow()}</span>
                        </div>
                    </div>
                    <div className="ig-comment-list">
                        <strong><p className="m-0" id="tituPost">{this.state.post.name}</p></strong>
                        {
                            this.state.post.user?.id !==this.state.user.id && this.state.post.postType === 2?
                            
                            inscripcion[this.state.inscription]
                            :
                            ""
                        }
                        <br/>
                        <p className="m-0">{this.state.post?.description}</p>
                        <br/>
                        {
                            this.state.post.contactNumber?
                            <p className="m-0"> Telefono: {this.state.post.contactNumber}</p>
                            :
                            ""
                        }
                        {
                            this.state.post.contactMail?
                            <p className="m-0" > Correo: {this.state.post.contactMail}</p>
                            :
                            ""
                        }
                        {
                            this.state.post.location?
                            <div>
                                <p>Lugar: <Link to={"/map/"+this.state.post.id} className="m-0" > {this.state.post.location.split(";")[0]}</Link></p>
                                
                            </div>
                            
                            :
                            ""
                        }{
                            this.state.post.dateEvent?
                            <p className="m-0"> Fecha de inicio: {moment(this.state.post.dateEvent, "YYYYMMDD").format("MMM Do YY")}</p>
                            :
                            ""
                        }
                        <br />
                    {
                        this.state.products.length !== 0?
                        <div>
                            <strong ng-if="evento.postVer.productos != false "><p className="m-0" id="tituPost">Productos exclusivos del evento</p></strong>
                            <br />
                            {
                                this.state.products.map(product =>{
                                    return <p ng-if="evento.postVer.productos != false"  className="m-0">{product.name}: ${product.value}</p>
                                })
                            }
                        </div>
                        :""
                    }
                    {
                        this.state.tickets.length !==0?
                        <div>
                             <strong ><p className="m-0" id="tituPost">Boleteria</p></strong>
                             <br />
                             {
                                 this.state.tickets.map(ticket=>{
                                     return <p  className="m-0">{ticket.description}: ${ticket.value}</p>
                                 })
                             }
                    
                        </div>
                        :""
                    }
                    <br />
                    {
                        this.state.sponsors.length !==0?
                        <div>
                            <strong ng-if="evento.postVer.sponsors != false"><p className="m-0" id="tituPost">Patrocinan</p></strong>
                            <br/>
                            {
                                this.state.sponsors.map(sponsor =>{
                                    return <div  style={{width: "100%", overflow:"auto", whiteSpace: "nowrap", marginTop:"10px"}}>
                                    <label style={{marginRight:"10px"}} >
                                        <img src={sponsor.logo}
                                                width="50" height="50" alt="..." className="img-circle" />
                                                <span >{sponsor.name}</span>
                                    </label>
                                </div>
                                })
                            }
                        </div>
                        :
                        ""
                    }
                    </div>
                    <div className="modal-meta-bottom">
                        <ul className="list-group list-group-horizontal">
                            <li>
                                <a className="modal-like" style={{textDecoration:"none"}}  onClick={
                                    ()=>{
                                        // console.log("entra");
                                        this.reactEvent()
                                    }
                                }>
                                    {
                                        this.state.isReact?
                                        <div>
                                            <i  className="fa fa-heart" style={{color:"#FF9900", fontSize:"15px"}}></i>
                                            <span 
                                    className="modal-one" style={{color:"#FF9900", fontSize:" 20px"}}> {this.state.reactions}
                                    </span>
                                        </div>
                                        :
                                        <div>
                                            <i  className="fa fa-heart" style={{color:"gray",  fontSize: "15px"}}></i>
                                        <span 
                                    className="modal-one" style={{color:"gray",  fontSize: "20px"}}> {this.state.reactions}</span>
                                        </div>
                                    
                                    }
                                    
                                </a>
                            </li>
                            <li>
                            <a className="modal-comment" href={true} style={{textDecoration:"none"}}>
                                    <i className="fa fa-comments" style={{color:"gray", fontSize: "20px" }}></i>
                                    <span 
                                    className="modal-one" style={{color:"gray",  fontSize: "20px"}}> {this.state.comments.length}</span>
                                </a>
                            </li>
                        </ul>
                        <CommentComponent post={this.state.post} update={this.getcomments}/>
                    </div>
                    <ul className="img-comment-list">
                        {
                            this.state.comments.length !== 0?
                            this.state.comments.map(comment=>{
                                return <li >
                                <div className="comment-img">
                                    <Link to={"/profile/"+comment.user.id} >
                                        <img src={process.env.REACT_APP_BASE_URL+comment.user.profile_img} className="img-responsive img-circle"
                                        alt={comment.user.nickname} />
                                    </Link>
                                </div>
                                <div className="comment-text">
                                    <strong><Link to={"/profile/"+comment.user.id} >{comment.user.name}</Link></strong>
                                    <p>{comment.comment}</p> <span className="date sub-text">{moment(comment.updatedAt, "YYYYMMDD").fromNow()}</span>
                                </div>
                        </li>
                            })
                            :
                            <li>
                            <strong><p>No hay comentarios</p></strong>
                        </li>
                        }
                    </ul>
                </Col>
            </Row>
        </Container>;
    }
}

export default PostViewComponent;