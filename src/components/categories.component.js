import React from "react";
import axiosInstance from '../services/axios.service';

class Categories extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        this.getCategoriess();

    }
    render() {
        return <div>
            {
            this.state.categories.map(category =>{
                return <div  className="form-group "key={category.id}>
                <button className={this.props.className} name="register"  type="button" data-toggle="modal" key={category.id} id={category.id} data-target="#modalHobbies" value={category.id} onClick={this.props.onClick}><i className=""></i> {category.name}  </button>

            </div>
            })
            }
            </div>;
    }

    getCategoriess=()=>{
        axiosInstance.get("category").then(res => {
            if (res.status === 200) {
                this.setState({categories: res.data})
            }
        })
    }
}

export default Categories;