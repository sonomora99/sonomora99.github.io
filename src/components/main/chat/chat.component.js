import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useAuth from '../../../auth/useAuth';

export default function ChatComponent() {
    const auth = useAuth();
    const user = auth.user;
    const socket = auth.socket

    return <div className="newsfeed">
        <Container fluid>
            <Row>
                <Col lg={3} md={3} sm={12} xm={12}>
                    <Row>
                        <Col lg={12} md={12} sm={12} xm={12}>
                            <div className="message-header">
                                <div className="message-title">
                                    <h4>Messages</h4>
                                </div>
                                <div className="search-area">
                                    <div className="input-field">
                                        <input placeholder="Search" type="text" />
                                        <i className="fa fa-search"></i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xm={12}>
                            <div className="messages-list">
                                <ul>
                                    <li className="active" ng-repeat="chats in ch.chats | orderBy: 'ultimo'">
                                        <a href="#!messages/{{chats.de_usuario}}" ng-click="ch.marcarVisto(chats.de_usuario)">
                                            <div className="user-message-details">
                                                <div className="user-message-img">
                                                    <img src={process.env.REACT_APP_BASE_URL + "assets/img/users/default-users.jpg"} className="img-responsive img-circle" alt="" />

                                                </div>
                                                <div className="user-message-info">
                                                    <h4>{"{chats.nombre}"}</h4>
                                                    <p ng-if="chats.ultimo[0].visto == 0"><strong>{"{chats.ultimo[0].mensaje}"}</strong></p >
                                                    <p ng-if="chats.ultimo[0].visto == 1">{"{chats.ultimo[0].mensaje}"}</p>
                                                    <span className="time-posted">{"{chats.ultimo[0].fechaEnviado}"}</span>
                                                </div>

                                            </div>

                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} md={6} sm={6} xm={6}>
                    <Row>
                        <Col lg={12} md={12} sm={12} xm={12}>
                            <div className="conversation-box">

                                <div className="conversation-header">
                                    
                                    <div className="user-message-details">
                                    <div className="user-message-img">
                                        <img src={process.env.REACT_APP_BASE_URL + "assets/img/users/default-users.jpg"} className="img-responsive img-circle" alt="" />

                                    </div>
                                        <div className="user-message-info">
                                            <h4>{"{ms.userChat}"}</h4>

                                        </div>

                                    </div>


                                </div>

                                <div className="conversation-container" id="scrl" style={{ height: "360px", overflow: "auto" }}>

                                    <div ng-repeat="messages in ms.mensajes |orderBy:'fechaEnviado':false">
                                        <div ng-if="messages.nickname == ms.me" className="convo-box pull-right">
                                            <div className="convo-area pull-right">
                                                <div className="convo-message">
                                                    <p>{"{messages.mensaje}"}</p>
                                                </div>

                                                <span>{"{messages.fechaEnviado}"}</span>

                                                <div className="convo-img">
                                                    <img src="{{messages.img_perfil}}" alt="" className="img-responsive img-circle" />
                                                </div>
                                            </div>
                                        </div>

                                        <div ng-if="messages.nickname == ms.userChat" className="convo-box convo-left">
                                            <div className="convo-area convo-left">
                                                <div className="convo-message">
                                                    <p>{"{messages.mensaje}"}</p>
                                                </div>

                                                <span>{"{messages.fechaEnviado}"}</span>

                                                <div className="convo-img">
                                                    <img src="{{messages.img_perfil}}" alt="" className="img-responsive img-circle" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="type_messages">
                                    <div className="input-field">
                                        <form className="form-login" ng-submit="ms.enviarMensaje()">
                                            <textarea></textarea>
                                            {/* <input type="text" id="userMessage" ng-model="ms.mensaje" className="form-control"
                                                placeholder="Escribir" /> */}
                                            {/* <ul className="imoji">

                                                <li style={{ padding: "0%" }}><a href="" ng-click="ms.enviarMensaje()"
                                                    style={{ fontSize: "20px" }}><i className="fa fa-paper-plane"></i></a></li>
                                            </ul> */}
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} md={3} sm={12} xm={12}>
                    <Row>
                       
                        <Col lg={12} md={12} sm={12} xm={12}>
                            <div className="messages-list">
                                <ul>
                                    <li className="active" ng-repeat="chats in ch.chats | orderBy: 'ultimo'">
                                        <a href="#!messages/{{chats.de_usuario}}" ng-click="ch.marcarVisto(chats.de_usuario)">
                                            <div className="user-message-details">
                                                <div className="user-message-img">
                                                    <img src={process.env.REACT_APP_BASE_URL + "assets/img/users/default-users.jpg"} className="img-responsive img-circle" alt="" />

                                                </div>
                                                <div className="user-message-info">
                                                    <h4>{"{chats.nombre}"}</h4>
                                                    <p ng-if="chats.ultimo[0].visto == 0"><strong>{"{chats.ultimo[0].mensaje}"}</strong></p >
                                                    <p ng-if="chats.ultimo[0].visto == 1">{"{chats.ultimo[0].mensaje}"}</p>
                                                    <span className="time-posted">{"{chats.ultimo[0].fechaEnviado}"}</span>
                                                </div>

                                            </div>

                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
}