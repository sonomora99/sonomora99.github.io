import React from "react";

class Story extends React.Component {
    history = {image: "assets/img/posts/15.jpg"};
    stylehistory = {
        background: "linear-gradient( rgba(34,34,34,0.78), rgba(34,34,34,0.78)), url('"+this.history.image+"') no-repeat",
        backgroundSize:" cover",
        backgroundPosition:" center center",
        webKitBackgroundSize:" cover",
        MozBackgroundSize:"cover",
        OBackgroundSize:" cover"
    }
    render() { 
        return <div>
            
					<div className="storybox" style={this.stylehistory}>
						<div className="story-body text-center">
							<div className=""><img className="img-circle" src="assets/img/users/15.jpg" alt="user"/></div>
							<h4>Vanessa Wells</h4>
							<p>5 hours ago</p>
						</div>
					</div>
			
        </div>;
    }
}
 
export default Story;