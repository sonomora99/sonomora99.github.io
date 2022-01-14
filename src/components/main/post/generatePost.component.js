import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../auth/useAuth";
import axiosInstance from "../../../services/axios.service";


export default function GeneratePost() {
    const auth = useAuth();
    const user = auth.user;
    
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [files,setFiles] = useState([]);
    const [isSend,setIsSend] = useState(false);
    const onSubmit = (data) => {
        setIsSend(true)
    const sendData = new FormData();
    sendData.append("id",user.id);
    sendData.append("description",data.description);
    files.forEach((file,index) =>{
        sendData.append("file",file)
    })
      axiosInstance.post("post/generatePost",sendData).then(res=>{
        setIsSend(false)
      }).catch(err=>{
            if(err.response){
                console.log(err.response);
            }
        setIsSend(false)

      })
      reset()
      setFiles([])
    };

    const imagePreview =(e)=>{
        setFiles(Array.from(e.target.files));
    }
    return <div className="box">


        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>

            <textarea className="form-control no-border" rows="3" placeholder="Descripción" id="desc"
                {...register("description")}></textarea>

            
            <div className="box-footer clearfix">
                <div className="col-lg-12" style={{ overflow: "auto", whiteSpace: "nowrap" }}>
                    {
                        files.map((file,index)=>{
                            let url = URL.createObjectURL(file);
                            return file.type!== "video/mp4"?<img
                            style={{ width: "40px", height: "100%" }} alt="Imagen" className="img-thumbnail" key={index} src={url} />:<video className="img-thumbnail" style={{ width: "40px", height: "100%" }} key={index} src={url} muted autoPlay></video>
                            
                        })
                    }
                    
                    
                </div>
                <label>
                    <i className="fa fa-paperclip text-muted" id="selectMedia">
                <input type="file" id="archivos" name=""  accept="image/*,video/mp4"
                        style={{ display: "none" }}
                        onChange={(event)=>{
                            imagePreview(event)
                        }}
                        multiple capture  />
                    </i>
                </label>
                {
                    isSend?<button  className="kafe-btn kafe-btn-mint-small pull-right btn-sm" disabled>

                    <span style={{ width: "1.5em", height: "1.5em" }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Publicando
                </button>:<button type="submit" className="kafe-btn kafe-btn-mint-small pull-right btn-sm">
                    Publicar
                </button>
                }
                
                

            </div>
        </form>

    </div>;
}