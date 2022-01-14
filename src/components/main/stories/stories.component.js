import React from "react";
import Story from "./story.component";

class Stories extends React.Component {
    state = {
        stories:[]
    }
    
    render() { 
        return <div>{
            this.state.stories.map(story=>{
                <Story></Story>
            })
        }</div>;
    }
}
 
export default Stories;