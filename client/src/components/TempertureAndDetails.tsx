import React from "react";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import { formatToLoalTime, iconUrlFromCode } from "../services/weatherService";
function TempertureAndDetails(weather:any) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-regal-blue">
        <p>{weather.weather.details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src={iconUrlFromCode(weather.weather.icon)}
          alt=""
          className="w-20"
        />
        <p className="text-5xl">{`${weather.weather.temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <DeviceThermostatOutlinedIcon className="mr-1" />
            Real Feel:
            <span className="font-medium ml-1">{`${weather.weather.feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <OpacityOutlinedIcon className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${weather.weather.humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <AirOutlinedIcon className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${weather.weather.speed.toFixed()}Km/h`} </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        
      <WbSunnyOutlinedIcon/>
      <p className="font-light">Rise: <span className="font-medium ml-1">{formatToLoalTime(weather.weather.sunrise,weather.weather.timeZone,'hh:mm a')}</span></p>
      <p className="font-light">|</p>

      <WbTwilightOutlinedIcon/>
      <p className="font-light">Set: <span className="font-medium ml-1">{formatToLoalTime(weather.weather.sunset,weather.weather.timeZone,'hh:mm a')}</span></p>
      <p className="font-light">|</p>

      <WbSunnyOutlinedIcon/>
      <p className="font-light">High: <span className="font-medium ml-1">{`${weather.weather.temp_max.toFixed()}°`}</span></p>
      <p className="font-light">|</p>

      <WbSunnyOutlinedIcon/>
      <p className="font-light">Low: <span className="font-medium ml-1">{`${weather.weather.temp_min.toFixed()}°`}</span></p>
      </div>
    </div>
  );
}

export default TempertureAndDetails;
