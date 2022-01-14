import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { AuthContext } from "../../../auth/Auth.provider";
import axiosInstance from "../../../services/axios.service";
import UserView from "./UsersView.component";

class FollowingList extends React.Component {
    static contextType = AuthContext;
    state = {
        user: this.context.user,
        followings:[],
        followingCurrentUser:[]
    }

    componentDidMount() {
        const id_user = this.props.match.params.user_id;
        if (id_user !== undefined) {
            axiosInstance.get("users/getUser/" + id_user).then(res => {
                if (res.status === 200) {
                    this.setState({ user: res.data.user, currentUser: false }, () => {
                     
                        this.getUserFollowing()
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
           
        this.getUserFollowing()
        }
        this.getFollowingCurrentUser()
        
        
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
    getFollowingCurrentUser =()=>{
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("users/getFollowings",sendData).then(res=>{

            if(res.status === 200){
                let ids = [];
                res.data.users.forEach(user=>{
                    ids.push(user.id)
                })
                console.log(ids);
                this.setState({followingCurrentUser: ids})
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    render() { 
        return <div className="followers">
        <Container fluid>
            <Row>
                <Col lg={8} md={8} sm={12} className="col-lg-offset-2">
                    <div className="followers-box full-width">
                        <div className="followers-list" >
                        {this.state.followings.length===0?<h1>No hay usuarios</h1>:this.state.followings.map(users=>{
                            
                            return <UserView design="follow"  user={users} />
                        })}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        
    </div>;
    }
}
 
export default withRouter(FollowingList);