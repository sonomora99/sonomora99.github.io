import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../auth/Auth.provider";
import axiosInstance from "../../services/axios.service";
import GeneratePost from "./post/generatePost.component";
import PostPreview from "./post/postPreview.component";
import Story from "./stories/story.component"
import SuggestedUser from "./users/suggestedUser.component";
class Home extends React.Component {
    static contextType = AuthContext;

    state = {
        stories: [],
        post: [],
        todayPost: [],
        user: this.context.user,
    }

    getPost = () => {
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("post/followedPost",sendData).then(res=>{
            if(res.status === 200){
                this.setState({post:res.data.posts})
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    componentDidMount() {
        this.getPost()
    }
    render() {
        return <div className="newsfeed">
            <Container fluid>
                <Row>
                    <Col lg={3} md={3} sm={12}>
                        <Story></Story>
                    </Col>
                    <Col lg={6} md={6} sm={12} >
                        <GeneratePost></GeneratePost>
                        {
                            this.state.post.length === 0?<div >
                            <h1>No hay eventos todavia</h1>
                        </div>:this.state.post.map(post=>{
                            return <PostPreview key={post.id} post={post} type={"Home"}/>
                        })}
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                        <div className="suggestion-box full-width">
                            <div className="suggestions-list" style={{ overflow: "auto", whiteSpace: "nowrap", height: " 300px" }}>
                                <SuggestedUser design="Home"  />
                            </div>
                        </div>
                        
                        <div className="trending-box">
                            <Row>
                                <Col lg={6} md={6} sm={6} >
                                    <h4>Lo de hoy</h4>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>;
    }

    getStories(){

    }
   

    getTodaypost(){

    }
}

export default Home;