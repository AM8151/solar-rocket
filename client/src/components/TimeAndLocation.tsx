import React from "react";

import { formatToLoalTime } from "../services/weatherService";

function TimeAndLocation(weather:any) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight ">
          {formatToLoalTime(weather.weather.dt,weather.weather.timezone)}
        </p>
        </div>
        <div className="flex items-center justify-center my-3">
            <p className="text-white text-3xl font-medium">  
            {`${weather.weather.name},${weather.weather.country}`}
            </p>
        </div>
   
    </div>
  );
}

export default TimeAndLocation;
