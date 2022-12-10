import { IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { toast } from "react-toastify";

const Inputs = (Props: any): JSX.Element => {
   const [city, setCity] = useState("");


   const handleSearchClick = ()=>{
       if(city!== '') Props.setQuery({q:city})
   }

   const handleLocationClick =()=>{
    toast.info('Fetching user loacation.');
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((possition)=>{
        toast.success('Location fetched!');
         let lat = possition.coords.latitude
         let lon = possition.coords.longitude

         Props.setQuery({
          lat,
          lon,
         })
      })
    }
   }
   const handleUnitsChange = (e: { currentTarget: { name: any; }; })=>{
    const selectedUnit = e.currentTarget.name;
    if(Props.units !== selectedUnit) Props.setUnits(selectedUnit)
   }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
        value={city}
        onChange={(e)=> setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        ></input>
         {/* <svg  className=" text-white cursor-pointer transition ease-out hover:scale-125"  height="45%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg> */}
         <IconButton >
             <SearchIcon  className="text-white hover:scale-125" onClick={handleSearchClick}/>
          </IconButton>
          <IconButton>
         < LocationOnIcon  className="text-white hover:scale-125"  onClick={handleLocationClick} />
          </IconButton >
           {/* <svg className=" text-white cursor-pointer transition ease-out hover:scale-125"  height="45%"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M18,4.48a8.45,8.45,0,0,0-12,12l5.27,5.28a1,1,0,0,0,1.42,0L18,16.43A8.45,8.45,0,0,0,18,4.48ZM16.57,15,12,19.59,7.43,15a6.46,6.46,0,1,1,9.14,0ZM9,7.41a4.32,4.32,0,0,0,0,6.1,4.31,4.31,0,0,0,7.36-3,4.24,4.24,0,0,0-1.26-3.05A4.3,4.3,0,0,0,9,7.41Zm4.69,4.68a2.33,2.33,0,1,1,.67-1.63A2.33,2.33,0,0,1,13.64,12.09Z"/></svg> */}
      </div >
      <div className="flex flex-row w-1/4 item-center justify-center">
       <button name="metric" className="text-xl text-white font-light transition ease-out hover:scale-125 " onClick={handleUnitsChange} >°C</button>
       <p className="text-xl text-white mx-1">|</p>
       <button name="imperial" className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange} >°F</button>
      </div>
    </div>
  );
};

export default Inputs;
