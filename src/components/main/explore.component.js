import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../auth/Auth.provider";
import axiosInstance from "../../services/axios.service";
import PostPreview from "./post/postPreview.component";
import SuggestedUser from "./users/suggestedUser.component";

class Explore extends React.Component {
    static contextType = AuthContext;

    state = {
        filterSuggestedPost:[],
        suggestedPost: [],
        user: this.context.user,

    }
    handleChange = (e)=>{
        let search = e.target.value
        if(search ===""){
            this.setState({filterSuggestedPost:this.state.suggestedPost})
        }else{
            this.setState({ filterSuggestedPost: this.state.suggestedPost.filter(post => post.description.toLowerCase().includes(search))
            })

        }   
    }
    getSuggestedPost = ()=>{
        
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("post/getSuggestedPost",sendData).then(res=>{
            if(res.status === 200){
                this.setState({suggestedPost:res.data.posts,filterSuggestedPost:res.data.posts})
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    componentDidMount() {
        this.getSuggestedPost()
    }

    render() { 
        return <div className="newsfeed">
            <Container>
                <Row className = "one-row">
                    <Col xs={12} md={12} lg={12} sm={12} className="navbar-right form-group">
                        <div className="box">
                        <input className="form-control no-border" placeholder="BUSCAR AQUI" onChange={this.handleChange} type="text"/>
                        </div>
                    </Col>
                </Row>
                <Row className = "one-row">
                    <Col xs={12} md={12} lg={12} sm={12} className="navbar-right form-group">
                        <h4>Usuarios de spots</h4>
                    </Col>
                </Row>
                <Row className = "one-row" style={{overflow:"auto", overflow:"hidden", whiteSpace: "nowrap", height: "300px"}}>
                    <Col xs={12} md={12} lg={12} sm={12} className="navbar-right form-group">
                        
                            <SuggestedUser design="Explore"  />
                    </Col>
                </Row>
                <Row className = "one-row">
                    <Col xs={12} md={12} lg={12} sm={12} className="navbar-right form-group">
                        <h4>Explorar Eventos</h4>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.filterSuggestedPost.length === 0?<h1 >No hay posts por explorar</h1>:this.state.filterSuggestedPost.map(post=>{
                            return <PostPreview key={post.id} post={post} type={"Explore"}/>
                        })
                    }
                
                </Row>
            </Container>
        </div>;
    }
}
 
export default Explore;