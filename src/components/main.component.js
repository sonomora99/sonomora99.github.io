import React from 'react';
import {  Switch,Route } from 'react-router';
import ChatComponent from './main/chat/chat.component';
import Explore from './main/explore.component';
import Home from './main/home.component';
import Maps from './main/maps.component';
import GenerateEvent from './main/post/generateEvent.component';
import PostViewComponent from './main/post/postView.component';
import Profile from './main/profile.component';
import followerListComponent from './main/users/followerList.component';
import followingListComponent from './main/users/followingList.component';
import MainNavbar from './MainNavbar.component';

class Main extends React.Component {

     render() { 
        return <div className="back">
            
            <MainNavbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/profile/:user_id?" exact component={Profile} />
                <Route path="/maps" exact component={Maps} />
                <Route path="/followers/:user_id?" exact component={followerListComponent}/>
                <Route path="/following/:user_id?" exact component={followingListComponent}/>
                <Route path="/post/:nickname?/:post_id?" exact component={PostViewComponent}/>
                <Route path="/generateEvent" exact component={GenerateEvent}/>
                <Route path="/chat" exact component={ChatComponent}/>
                </Switch> 
            
        </div>;
    }

    
}
 
export default Main;