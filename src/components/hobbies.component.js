import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axiosInstance from '../services/axios.service';


class Hobbies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idCategory: this.props.idCategory,
            hobbies: [],
            filterHobbies: [],
            selected: this.props.hobbies
        }
    }
    componentDidMount() {
        this.filterHobbies()

    }
    render() {
        return <Container fluid>
            <Row>
                <Col lg={12} md={12} sm={12} xm={12}>
                    <input type="text" name="filterHobbie" id="filterText" placeholder="Buscar" className="form-control" style={{ marginBottom: "10px" }} onChange={this.handleChange} />
                </Col>
                <Col lg={12} md={12} sm={12} xm={12}>
                    <h6 style={{ color: "black" }} >
                        {

                            this.state.selected.map(select => select.name + " ")
                        }
                    </h6>
                </Col>
            </Row>
            <Row style={{ overflow: "auto", height: "300%" }}>
                {
                    this.state.filterHobbies.map(hobby => {
                        return <Col xm={1} sm={3} md={3} lg={3} key={hobby.id}>
                            <div className="btn-group-toggle" data-toggle="buttons" >
                                {


                                    this.isSelected(hobby) ?


                                        <button className=" btn-theme-selected btn-block" key={hobby.id} onClick={() => this.selectHobby(hobby)}>{hobby.name}</button>

                                        :

                                        <button key={hobby.id} className=" btn-theme btn-block" onClick={() => this.selectHobby(hobby)}>{hobby.name}</button>

                                }
                            </div>
                        </Col>
                    })
                }
            </Row>
        </Container>;
    }

    filterHobbies = () => {

        axiosInstance.get("hobby").then(res => {
            if (res.status === 200) {
                this.setState({ hobbies: res.data })
                if (this.state.idCategory !== 0) {
                    this.setState({ filterHobbies: this.state.hobbies.filter(hobby => (hobby.id_category + "") === this.state.idCategory) })
                    this.setState({hobbies:this.state.filterHobbies})
                } else {
                    this.setState({ filterHobbies: res.data })
                }
            }
        })
    }
    handleChange = (e) => {
        let search = e.target.value
        if(search ===""){
            this.setState({filterHobbies:this.state.hobbies})
        }else{
            this.setState({ filterHobbies: this.state.hobbies.filter(hobby => hobby.name.toLowerCase().includes(search))
            })

        }
    }

    selectHobby = (hobby) => {
        if (!this.isSelected(hobby)) {
            this.setState({ selected: [...this.state.selected, hobby] }, () => {
                this.props.addHobbies(this.state.selected)
            })
        } else {
            this.setState({
                selected: this.state.selected.filter(h => h.id !== hobby.id)
            })

        }
    }

    isSelected = (hobby) => {
        let result = false;
        this.state.selected.forEach(element => {
            if (element.id === hobby.id) {
                result = true;
            }
        })
        return result;
    };
}

export default Hobbies;