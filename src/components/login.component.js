import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { AuthContext } from '../auth/Auth.provider';
import TotalSpooters from './Totalspooters.component';
import '../assets/css/demos/interest.css'
import '../assets/css/demos/main.css'
import LoginForm from './auth/LoginForm.component';

class Login extends React.Component {
    static contextType = AuthContext;

    render() {
        return (
            <section className="home back" >
                <Container >
                    <Row>
                        <TotalSpooters></TotalSpooters>
                        <LoginForm />
                    </Row>
                </Container>
            </section>
        );
    }

    login = () => {
        const auth = this.context;
        const username = "prueba";
        const password = "123"
        auth.logIn(username, password);

    }
}

export default Login;