import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { AuthContext } from "../../../auth/Auth.provider";
import axiosInstance from "../../../services/axios.service";
import UserView from "./UsersView.component";

class FollowerList extends React.Component {
    static contextType = AuthContext;
    state = {
        user: this.context.user,
        followers:[]
    }

    componentDidMount() {
        const id_user = this.props.match.params.user_id;
        if (id_user !== undefined) {
            axiosInstance.get("users/getUser/" + id_user).then(res => {
                if (res.status === 200) {
                    this.setState({ user: res.data.user, currentUser: false }, () => {
                        this.getUserFollowers()
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            this.getUserFollowers()
        }
        
        
    }

    render() { 
        return <div className="followers">
            <Container fluid>
                <Row>
                    <Col lg={8} md={8} sm={12} className="col-lg-offset-2">
                        <div className="followers-box full-width">
                            <div className="followers-list">
                            {this.state.followers.length===0?<h1>No hay usuarios</h1>:this.state.followers.map(users=>{
                                return <UserView design="follow" user={users} />
                            })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>;
    }
    getUserFollowers = ()=>{
        const sendData = {
            id: this.state.user.id
        }
        axiosInstance.post("users/getFollowers",sendData).then(res=>{
            if(res.status === 200){
                this.setState({followers: res.data.users})
            }
        }).catch(error=>{
            console.log(error);
        })
    }
}
 
export default withRouter(FollowerList);