import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Error from '../components/404.component';
import ForgotPassword from '../components/auth/forgotPassword.component';
import Main from '../components/main.component';
import PrivateRoute from './PrivateRoute.route';
// import Explore from '../components//main/explore.component';
// import Home from '../components//main/home.component';
// import Maps from '../components//main/maps.component';
// import Profile from '../components//main/profile.component';


export default function AppRouter(){
    return (
        <div className="back">
            
            <Router  >
                <Switch>   
                    <Route exact path="/login" >
                    <Redirect to="/" />
                    </Route>
                    <Route exact path="/forgotPassword" component={ForgotPassword}/>
                    <Route exact path="/404" component={Error}/>
                    <PrivateRoute path="/" component={Main} />
                    {/* <Route path="*">
                        <Redirect to="/404" />
                    </Route> */}
                </Switch>
            </Router>

        </div>
    )
} ;