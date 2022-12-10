
import * as DateTime from "luxon";
// import { useState } from "react";
const API_KEY = "571e2eb9d1a125dcb40105cf41751c49";
const BASE_URL = "Https://api.openweathermap.org/data/2.5/";
// const URLA = "Https://api.openweathermap.org/data/2.5/weather?q=jerusalem&appid=ae2819f18012aa2b2e275e70b4828d79"
// const lon = null
// var lat = null;
//

// export default getWeatherData;
// export class GetWeatherData{

const getWeatherData = async (infoType: string, searchParams: any) => {
    const u = BASE_URL + '/' + infoType;
    const url = new URL(u);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();
    const res = await fetch(url.href);
    const data = await res.json();

    console.log("this is res: "+data);

    return data;
};



const formatCurrentWeather = (data: any) => {

    const {
        list,
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0];
    return {list, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
};




const formatForecastWeather = async (data: any) => {

    let {timezone, list} = data
   
   var daily =list.map((d: { dt: any; main: { temp: any; }; weather: { icon: any; }[]; }) => {
       return {
            title: formatToLoalTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    });
    
    const hourly = list.slice(0, 4).map((d:{ dt: any; main: { temp: any; }; weather: { icon: any; }[]; }) => {
        return {
            title: formatToLoalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    });
    daily =[...new Map(daily.map((item:any)=>[item["title"],item])).values()];
    console.log("finished list:"+hourly);
    return { timezone, daily, hourly }
 }

const getFormattedWeatherData = async (searchParams: any) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather", searchParams)
        .then(formatCurrentWeather);


    const formattedForecastWeather = await getWeatherData('forecast',searchParams)
     .then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
}
const formatToLoalTime = (secs: number, zone: any, format = "cccc,dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.DateTime.fromSeconds(Number(secs))
    .setZone(zone).toFormat(format);

const iconUrlFromCode = (code: any) => `http://openweathermap.org/img/wn/${code}@2x.png`
export default getFormattedWeatherData;

export { formatToLoalTime, iconUrlFromCode, getWeatherData };