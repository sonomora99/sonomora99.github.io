import React , {useState, useEffect,useCallback, useRef} from "react";
import { GoogleMap,useLoadScript,Marker,InfoWindow} from "@react-google-maps/api"
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../../variables";
import axiosInstance from "../../services/axios.service";
import useAuth from "../../auth/useAuth";
import sportsImage from "../../assets/icons/sport.svg";
import artImage from "../../assets/icons/art.svg";
import cultureImage from "../../assets/icons/culture.svg";
import { Link } from "react-router-dom";
import Categories from '../../components/categories.component';

const mapContainerStyle={
    width:"100vw",
    height:"100vh",
}

const libraries =["places"]
const logos ={
    1:sportsImage,
    2:artImage,
    3:cultureImage,
}
const currentDate = new Date()
export default function Maps(){
    const auth = useAuth();
	const user = auth.user;
    const [postFilter,setPostFilter] = useState([]);
    const [postEvent,setPostEvent] = useState([]);
    const [selected,setSelected] = useState(null);
    const [center, setCenter]= useState({
        lat:8.570868,
        lng:-74.297333
    })
    useEffect(() => {
        getPost()
    }, [])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const mapRef =  useRef()
    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map;
        
            navigator.geolocation.getCurrentPosition((position)=>
    {
     setCenter({lat:position.coords.latitude, lng: position.coords.longitude})   
        
    },()=>null)
        },
        [],
    )
    const getPost = () => {
        const sendData = {
            id: user.id
        }
        axiosInstance.post("post/followedPost",sendData).then(res=>{
            if(res.status === 200){
                let posts=res.data.posts
                
                let events = posts.filter(post =>{
                    if(post.postType == 2 && post.location != null) {
                        let datePost = new Date(post.dateEvent)

                        if(datePost>currentDate){
                            return post

                        }
                    }
                })
                setPostEvent(events)
                setPostFilter(events)
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    const filter = (e)=>{
        let filterSearch = postEvent.filter(post=>post.postCategory == e.target.value)
        setPostFilter(filterSearch)

    }
    if(loadError) return "Error loading map";
    if(!isLoaded) return "Loading Map";

    
    
    return <div>
        
        <GoogleMap mapContainerStyle={mapContainerStyle} center ={center} zoom={15} onLoad={onMapLoad}>
        {postFilter.map(marker =>{
        let ubication = marker.location.split(";");
        marker.address = ubication[0]
        marker.lat = parseFloat(ubication[1])
        marker.lng = parseFloat(ubication[2])

        return <Marker key={marker.id} position={{lat:marker.lat,lng:marker.lng}} icon={{
            url:logos[marker.postCategory],
            scaledSize: new window.google.maps.Size(40,40),
            anchor: new window.google.maps.Point(20,20)

        }}
        onClick={() => {
            setSelected(marker);
        }}
        />
        
        })}
        {
            selected ?(<InfoWindow position={{lat:selected.lat,lng:selected.lng}} onCloseClick={()=>{
                setSelected(null)
            }}>
                <div>
                    <h2><strong>Evento: </strong>{selected.name}</h2>
                    <h3><strong>Lugar: </strong>{selected.address}</h3>
                    <h3><strong>Fecha: </strong>{selected.dateEvent}</h3>
                    <h5><Link to={"post/"+selected.user.nickname+"/"+selected.id}>ver mas</Link></h5>
                </div>
            </InfoWindow>):null
        }
        <div className="CatList btn-group" style={{margin: "25px", zIndex: "0", position: "absolute", cursor: "pointer", left: "0px", top: "15%"}}>
            <div>
            <div  className="form-group " >
                <button className={"btn-theme btn-block"} name="register"  type="button" data-toggle="modal" data-target="#modalHobbies" value={0} onClick={()=>{

                    setPostFilter(postEvent)
                }}><i className=""></i> TODOS  </button>

            </div>
            </div>
            
           
        </div>
        <div className="CatList btn-group" style={{margin: "25px", zIndex: "0", position: "absolute", cursor: "pointer", left: "0px", top: "25%"}}>
            <Categories onClick={filter} className=" btn-theme btn-block"></Categories>
        </div>
        </GoogleMap> 
    </div>;
    
    
}