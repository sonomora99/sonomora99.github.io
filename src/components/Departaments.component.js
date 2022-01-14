import React from 'react';
import axiosInstance from '../services/axios.service';

class Departaments extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            departaments: [],
            cities: [],

        }
    }
    componentDidMount(){
        this.getDepartaments();

    }
    render() {
        return <div>
            <div className="form-group">
                
                <select className="form-control" onChange={this.getcities}  >
                    <option value="0" > --seleccione un departamento--</option>
                    {
                        this.state.departaments.map(dept =>{
                            return <option value={dept.id} id={dept.id} key={dept.id}>
                                {dept.name}
                            </option>
                        })
                    }
                </select>
                

            </div>

            <div className="form-group">
                <select className="form-control"  {...this.props.register("city")}>

                    <option value="" > --seleccione un municipio--</option>
                    {
                        this.state.cities.map(city =>{
                            return <option value={city.id} id={city.id} key={city.id}>
                                {city.name}
                            </option>
                        })
                    }

                </select>

            </div>
        </div>;
    }

    getDepartaments = () => {
        axiosInstance.get("departaments").then(res => {
            if (res.status === 200) {
                this.setState({departaments: res.data})
            }
        })
    }
    getcities = (e)=>{
        const id = e.target.value;

        if(id !== 0){
            axiosInstance.get("city/"+id).then(res => {
                if (res.status === 200) {
                    this.setState({cities: res.data})
                }
            })
        }
    }


}

export default Departaments;