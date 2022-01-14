import React from "react";
import { AuthContext } from "../../../auth/Auth.provider";
import axiosInstance from "../../../services/axios.service";
import UserView from "./UsersView.component";

class SuggestedUser extends React.Component {
    static contextType = AuthContext;
    state= {
        suggestedUsers:[],
        user: this.context.user,
    }

    componentDidMount(){
        this.getSuggested()
    }
    updateComponent =(userFollow)=>{
        let newList = this.state.suggestedUsers.filter(user=> user.id !==userFollow.id )
        this.setState({suggestedUsers:newList})
        this.forceUpdate()
    }
    render() { 
        return <div>{
            
            this.state.suggestedUsers.length===0?<div>
							<h1>No hay usuarios sugeridos</h1>
						</div>:this.state.suggestedUsers.map(suggest=>{
                return <UserView key={suggest.id} user={suggest} follow={this.follow}  design={this.props.design} reloadList={this.updateComponent}  />
            })}
            </div>;
    }

    getSuggested(){
        let dataSend ={
            id: this.state.user.id
        }
        axiosInstance.post("users/suggestedUser",dataSend).then(res=>{
            if(res.status === 200){
                this.setState({suggestedUsers: res.data.users})
            }
        }).catch(error=>{
            console.log(error);
        })
        
    }


}
 
export default SuggestedUser;