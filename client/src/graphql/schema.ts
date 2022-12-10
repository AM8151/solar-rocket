export type Mission = {
  id: String;
  title: String;
  operator: String;
  launch: Launch;
  orbit: Orbit;
  payload: Payload;
}

export type Launch = {
  date: Date;
  vehicle: String;
  location: Location;
}

export type Location = {
  name: String;
  longitude: Number;
  latitude: Number;
}

export type Orbit = {
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
}

export type Payload = {
  capacity: Number;
  available: Number;
}

export type weather = {

  lat: any
  lon: any
  temp: any
  feels_like: any,
  temp_min: any,
  temp_max: any,
   humidity: any,
    name: any, 
    dt: String, 
    country: any, 
    sunrise: any,
     sunset: any, 
     details: any, 
     icon: any, 
     speed: any

}
export type weatherList={
  title:String, 
  temp:any, 
  icon:any
}


