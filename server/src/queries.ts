import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";
import { Mission } from "./types";

export const ListMissions = (missions: Mission[], args: any) => {
  if (args.sort) {
    missions.sort((aMission: Mission, bMission: Mission) => {
      let a: String | Date, b: String | Date;
      switch (args.sort?.field) {
        case "Title":
          a = aMission.title;
          b = bMission.title;
          break;
        case "Date":
          a = new Date(aMission.launch.date);
          b = new Date(bMission.launch.date);
          break;
          case "Operator":
            a = aMission.operator;
            b = bMission.operator;
          break;
        default:
          a = "";
          b = "";
      }
      if (args.sort?.desc === true) {
        return a < b ? 1 : -1;
      } else {
        return a > b ? 1 : -1;        
      }
    });
  }
  return missions;
};

export const GetMissionById = (missions: Mission[], id: String) => {
  return missions.find((mission: Mission) => mission.id === id);
};

export const CreateMission = (mission: Mission): Mission => {
  mission.id = createHash("sha256")
    .update(uuidv4())
    .digest("hex")
    .substring(32);

  return mission;
};
export const UpdateMission = (missions: Mission[],mission:Mission):Mission =>{
   //var mission= GetMissionById(missions,id);
   const indexOfObject = missions.findIndex((object) => {
    return object.id === mission.id;
  });
 
   missions.splice(indexOfObject, 1,mission);    if(mission!==undefined){
     
      return mission;
     }
 return missions.filter(mission => mission.id === mission.id)[0];
};
export const DeleteMission = (missions: Mission[],id:String):Mission[] =>{
   
  const index = missions.findIndex((mision) => {
    return mision.id === id;
  });
  
  console.log(index); 
  
  if (index !== -1) {
   missions.splice(index, 1);
  }

return missions
};