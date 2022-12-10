import React from "react";
import { weatherList } from "../graphql/schema";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast(Props: { title:string, weather: { daily: weatherList[]; hourly: weatherList[]; }; }) {
 console.log("title:" + Props.title);
  var list: weatherList[];
  if(Props.title==="daily"){
   list = Props.weather.daily;
  }else {
   list = Props.weather.hourly;
  }

  

  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{`${Props.title} forecast`}</p>
      </div>
      <hr className="my-2 " />
      <div className="flex flex-row items-center justify-between text-white">
        {Array.from(list).map((item) => (

          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            
                <img
                  className="w-12 my-1"
                  src={iconUrlFromCode(item.icon)}
                  alt=""
                />
                <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
           
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
