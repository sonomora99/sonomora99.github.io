import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../auth/useAuth";
import axiosInstance from "../../../services/axios.service";


export default function CommentComponent(props) {
    const auth = useAuth();
    const user = auth.user;
    const socket = auth.socket
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [files,setFiles] = useState([]);
    const [isSend,setIsSend] = useState(false);
    const onSubmit = (data) => {

    //     setIsSend(true)
    const sendData = new FormData();
    sendData.append("id",user.id);
    sendData.append("id_post",props.post.id);
    sendData.append("comment",data.comment);

    // files.forEach((file,index) =>{
    //     sendData.append("file",file)
    // })
      axiosInstance.post("post/commentPost",sendData).then(res=>{
        props.update()
        
        if(user.id !== props.post.user?.id){
            console.log("entra y genera notificacion");
            const notification ={
                notification: user.nickname+" comentó tu publicacion",
                link: "/post/"+props.post.user?.nickname+"/"+props.post.id,
                viewed:0,
                id_from:user.id,
                id_to:props.post.user?.id
            }
            console.log("noti",notification);
            socket.emit("sendNotification",notification)
        }
    }).catch(err=>{
            if(err.response){
                console.log(err.response);
            }

      })
      reset()
    //   setFiles([])
    };

    const imagePreview =(e)=>{
        setFiles(Array.from(e.target.files));
    }
    return <ul className="list-group list-group-horizontal">
    <li>
        <span className="thumb-xs">
            <img className="img-responsive img-circle" src={process.env.REACT_APP_BASE_URL +user.profile_img}
                alt="Image" style={{marginRight: "6px"}}/>
                
        </span>
        
    </li>
    <li>
        <div className="comment-body" style={{marginRight: "6px"}}>
            <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>          
                    <input className=" form-control input-sm" id="comentario" type="text" 
            placeholder="Write your comment..." {...register("comment")} />
            </form>
        </div>
    </li>
    {/* <li>
        <input type="submit" className="fa fa-paper-plane" value="">
    </li> */}
</ul>;
}