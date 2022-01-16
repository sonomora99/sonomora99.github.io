import React , {useState, useRef,useCallback}from 'react';

import { GoogleMap,useLoadScript,Marker,InfoWindow} from "@react-google-maps/api"


import usePlacesAutocomplete,{
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  const mapContainerStyle={
    width:"100%",
    height:"100vh",
}
const center={
    lat:4.570868,
    lng:-74.297333
}
const libraries =["places"];

export default function SearchAddres(props){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    }); 
    
    const {
        init,
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,

    } = usePlacesAutocomplete({
        initOnMount:false,
        requestOptions: {
            // location: {lat:()=>43.653225, lng: ()=>-79.383186},
            // radius:200*1000,
        }
    });
    

    const [searchMarker, setSearchMarker] =  useState([]);
    const mapRef =  useRef()

    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map;
            init()
        },
        [],
    )

    const panTo =useCallback(({lat,lng})=>{
        mapRef.current.panTo({lat,lng});
        mapRef.current.setZoom(14)
    },[])
    
    if(loadError) return "Error loading map";
    if(!isLoaded) return "Loading Map";
    
    return <div>
        <Combobox onSelect={ async (address)=>{
            setValue(address,false);
            clearSuggestions()
        try{
            const result = await getGeocode({address})

            const {lat,lng} = await getLatLng(result[0]);
            props.setAddress(result[0]["formatted_address"]+";"+lat+";"+lng)
            panTo({lat,lng})

            setSearchMarker([{lat,lng,time:new Date()}])
        }catch(error){
            console.error(error);
        }
    }}>
        <ComboboxInput value={value} onChange={ (e)=>{
            setValue(e.target.value)
        }} 
        disabled={!ready}
        // {...props}
        className={props.className}
        title={props.title}
        placeholder={props.placeholder}
        required={props.required}
        />
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" && data.map(({id, description})=> <ComboboxOption key={id} value={description}/>)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} onLoad={onMapLoad}>

        {searchMarker.map(marker =><Marker key={marker.time.toISOString()} position={{lat:marker.lat,lng:marker.lng}} />)}
    </GoogleMap>
    </div>
    // return <input type="text"{...props} />
}