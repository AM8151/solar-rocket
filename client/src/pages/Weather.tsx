import { Container } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import TopButtons from "../components/TopButtons";
import Inputs from "../components/Inputs";
import TimeAndLocation from "../components/TimeAndLocation";
import TempertureAndDetails from "../components/TempertureAndDetails";
import Forecast from "../components/Forecast";
import { useEffect, useState } from "react";
import weatherService from "../services/weatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Weather = (): JSX.Element => {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState();
 
  useEffect(() => {
    
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'
      toast.info('Fetching weather for '+ message);
      await weatherService({ ...query, units }).then((data: any) => {
        
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
       
        return setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

const formatBackground = ()=>{
  if(!weather) return 'from-cyan-700 to-blue-700'
  const threshold = units === 'metric' ? 20 : 60
  // if(weather.weather.temp <= threshold){
  //   return 'from-cyan-700 to-blue-700'


  // }
  // return 'from-yellow-700 to-orange-700'
}

 
  return (
    <AppLayout title="Weather">
      <Container maxWidth="lg">
        <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-regal-blue  h-fit shadow-sm shadow-gray-400 ${formatBackground()}`}>
          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} units= {units} setUnits={setUnits} />
          {weather && (
            <div>
              <TimeAndLocation weather={weather} />
              <TempertureAndDetails weather={weather} />

              <Forecast weather={weather} title="hourly"  />
              <Forecast weather={weather} title="daily"   />
            </div>
          )}
          <ToastContainer toastStyle={{ backgroundColor: "black" }} autoClose={5000}  newestOnTop={true} />
        </div>
      </Container>
    </AppLayout>
  );
};

export { Weather };
