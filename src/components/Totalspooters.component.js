import React from 'react';
import spotsImage from "../assets/spotsLogo.png";
import { Col } from 'react-bootstrap';

import axiosInstance from '../services/axios.service';

class TotalSpooters extends React.Component {
    state ={
        totalSpooters:0
    };
    componentDidMount(){
        this.getTotalSpooters()
    }
    render() {
        return (
            <Col lg={4} md={12} sm={12} xs={12} className="num-down">
                <Col lg={12} md={12} sm={12} xs={12} className="logo">
                    <img src={spotsImage} className="img-responsive img-fluid" alt="" style={{ margin: "auto" }} />
                </Col>
                <Col lg={12} md={12} sm={12} xs={12} className="num logo">
                    <i>
                        <h2>Spooters Registrados</h2>
                        <br></br>
                        <h3>{this.state.totalSpooters}</h3>
                    </i>
                </Col>
            </Col>
        );
    }

    getTotalSpooters = ()=>{
        axiosInstance.get("users/totalSpooters").then(res =>{
            if(res.status === 200){
                this.setState({totalSpooters : res.data.total})
            }
        })
    }
}

export default TotalSpooters;