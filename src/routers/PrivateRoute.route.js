import React from 'react';
import { Route } from 'react-router';
import useAuth from '../auth/useAuth';
import Login from '../components/login.component';

export default function PrivateRoute({component:Component, ...rest}){
    const auth = useAuth();


return <Route {...rest} >
            {
                auth.isLogged()?<Component/>
                :
                <Login/>
            }
            
        </Route>;
};