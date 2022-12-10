import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppLayout } from "../layouts/AppLayout";
import fetchGraphQL from "../graphql/GraphQL";
import { Mission, Launch, Orbit, Payload } from "../graphql/schema";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Add as AddIcon,
  // FilterAlt as FilterAltIcon,
  Sort as SortIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";

import { ListMenu } from "../components/ListMenu";
import { useMultistepForm } from "../useMultistepForm";
import CreateForm from "../components/CreateForm";
import LaunchForm from "../components/LaunchForm";
import OrbitForm from "../components/OrbitForm";
import PayloadForm from "../components/PaylaodForm";
import EditForm from "../components/EditFrom";

type SortField = "Title" | "Date";

interface MissionsResponse {
  data: {
    Missions: Mission[];
  };
}
interface MissionResponse {
  data: {
    Mission: Mission;
  };
}
const deleteMission = async (id: String): Promise<MissionsResponse> => {
  return await fetchGraphQL(
    ` mutation DeleteMission($id: DeleteMissionInput!) {
      deleteMission(
        id: $id
      )
      {
      id
      title
      operator
      launch 
      {
        date
      }
    
  }
    }`,
    { id: { id } }
  );
};
const updateMission = async (mission: Mission): Promise<MissionResponse> => {
  return await fetchGraphQL(
    `
    mutation UpdateMission($mission: UpdateMissionInput!){
    updateMission(
      mission: $mission
      )
      {
        
          id
          title
          operator
          launch {
            date
            vehicle
            location {
              name
              longitude
              latitude
            }
          }
          orbit {
            periapsis
            apoapsis
            inclination
          }
          payload {
            capacity
            available
          }
        }
      }`,
    { mission: mission }
  );
};
const postNewMission = async (
  mission: MissionData
): Promise<MissionResponse> => {
  const m = {
    title: mission.title,
    operator: mission.operator,
    launch: {
      date: mission.date,
      vehicle: mission.vehicle,
      location: {
        name: mission.name,
        longitude: mission.longitude,
        latitude: mission.latitude,
      },
    },
    orbit: {
      periapsis: mission.periapsis,
      apoapsis: mission.apoapsis,
      inclination: mission.inclination,
    },
    payload: {
      capacity: mission.capacity,
      available: mission.available,
    },
  };

  return await fetchGraphQL(
    `
    mutation CreateMission($mission: MissionInput!){
      createMission(
        mission: $mission
      ) {
        id
        title
        operator
        launch {
          date
          vehicle
          location {
            name
            longitude
            latitude
          }
        }
        orbit {
          periapsis
          apoapsis
          inclination
        }
        payload {
          capacity
          available
        }
      }
    }
  `,
    { mission: m }
  );
};

const getMissions = async (
  sortField: SortField,
  sortDesc?: Boolean
): Promise<MissionsResponse> => {
  return await fetchGraphQL(
    `
  {
    Missions
    (
      sort: 
      {
        field: ${sortField}
        desc: ${sortDesc}
      }
    ) 
    {
        id
        title
        operator
        launch {
          date
          vehicle
          location {
            name
            longitude
            latitude
          }
        }
        orbit {
          periapsis
          apoapsis
          inclination
        }
        payload {
          capacity
          available
        }

      
    }
  
  }
  `,
    []
  );
};

type MissionData = {
  //id: string;
  title: string;
  operator: string;
  date: Date;
  vehicle: string;
  name: string;
  longitude: Number;
  latitude: Number;
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
  capacity: Number;
  available: Number;
};

const INITIAL_DATA: MissionData = {
  //id: "",
  title: " ",
  operator: " ",
  date: new Date(500000000000),
  vehicle: " ",
  name: " ",
  longitude: 0,
  latitude: 0,
  periapsis: 0,
  apoapsis: 0,
  inclination: 0,
  capacity: 0,
  available: 0,
};

const MISSION: Mission = {
  id: "",
  title: "",
  operator: "",
  launch: {
    date: new Date(500000000000),
    vehicle: "",
    location: {
      name: " ",
      longitude: 0,
      latitude: 0,
    },
  },
  orbit: { periapsis: 0, apoapsis: 0, inclination: 0 },
  payload: { capacity: 0, available: 0 },
};

const Missions = (): JSX.Element => {
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [newMissionOpen, setNewMissionOpen] = useState(false);
  const [tempLaunchDate, setTempLaunchDate] = useState<Date | null>(null);
  const [editMissionOpen, setEditMissionOpen] = useState(false);
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>("Title");
  const [errMessage, setErrMessage] = useState<String | null>(null);

  const [submited, setSubmitting] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);
  const [editData, setEditData] = useState<Mission>(MISSION);
  const { goTo, step, isFirstStep, back, next, isLastStep } = useMultistepForm([
    <CreateForm {...data} updateFields={updateFields} />,
    <LaunchForm {...data} updateFields={updateFields} />,
    <OrbitForm {...data} updateFields={updateFields} />,
    <PayloadForm {...data} updateFields={updateFields} />,
  ]);

  function updateFields(fields: Partial<MissionData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  function updateEditFields(fields: Partial<Mission>) {
    setEditData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  const handleNewMissionOpen = () => {
    setTempLaunchDate(null);
    setNewMissionOpen(true);
  };
  const handleEditMissionOpen = (key: number) => {
    if (missions !== null) setEditData(missions[key]);

    setEditMissionOpen(true);
  };

  const handleNewMissionClose = () => {
    setData(INITIAL_DATA);
    setNewMissionOpen(false);
    goTo(0);
  };
  const handleEditMissionClose = () => {
    setEditData(MISSION);
    setEditMissionOpen(false);
  };

  const handleSortFieldChange = (event: SyntheticEvent, value: SortField) => {
    setSortField(value);
  };
  const handleSortDescClick = () => {
    setSortDesc(!sortDesc);
  };
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const launch: Launch = {
      date: data.date,
      vehicle: data.vehicle,
      location: {
        name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
      },
    };

    const orbit: Orbit = {
      periapsis: data.periapsis,
      apoapsis: data.apoapsis,
      inclination: data.inclination,
    };
    const payload: Payload = {
      capacity: data.capacity,
      available: data.available,
    };
    const mission: Mission = {
      id: " ",
      title: data.title,
      operator: data.operator,
      launch,
      orbit,
      payload,
    };
    console.log(mission);

    postNewMission(data);
    handleNewMissionClose();
    setSubmitting(!submited);
  }
  function handleDeleteMission(key: number) {
    if (missions !== null) {
      let id: String = missions[key].id;
      deleteMission(id)
        .then((result: MissionsResponse) => {
          setSubmitting(!submited);
        })
        .catch((err) => {
          setErrMessage("Failed to load missions.");
          console.log(err);
        });
    }
  }
  function onEdit(e: FormEvent) {
    e.preventDefault();
    updateMission(editData)
      .then((result: MissionResponse) => {
        console.log(result.data.Mission);
        handleEditMissionClose();
        setSubmitting(!submited);
      })
      .catch((err) => {
        setErrMessage("Failed to edit mission.");
        console.log(err);
      });
  }
  useEffect(() => {
    getMissions(sortField, sortDesc)
      .then((result: MissionsResponse) => {
        setMissions(result.data.Missions);
        console.log(result.data.Missions);
      })
      .catch((err) => {
        setErrMessage("Failed to load missions.");
        console.log(err);
      });
  }, [sortField, sortDesc, submited]);

  return (
    <AppLayout title="Missions">
      <Container maxWidth="lg">
        <Typography className="text-white " variant="h4" component="h1">
          Solar Rocket Missions
        </Typography>

        <Toolbar disableGutters className="text-white">
          <Grid justifyContent="flex-end" container>
            <ListMenu
              className="text-white"
              options={["Date", "Title", "Operator"]}
              endIcon={<SortIcon className="text-white" />}
              onSelectionChange={handleSortFieldChange}
            />
            <IconButton onClick={handleSortDescClick}>
              {sortDesc ? (
                <ArrowDownwardIcon className="text-white" />
              ) : (
                <ArrowUpwardIcon className="text-white" />
              )}
            </IconButton>
          </Grid>
        </Toolbar>

        {missions ? (
          <Grid container spacing={2}>
            {" "}
            {missions.map((mission: Mission, key: any) => (
              <Grid item key={key}>
                <Card
                  sx={{
                    width: 275,
                    height: 230,
                    backgroundColor: "#00618180",
                    color: "white",
                  }}
                >
                  <CardHeader
                    className="text-white "
                    title={mission.title}
                    subheader={new Date(mission.launch.date).toDateString()}
                  />
                  <CardContent>
                    <Typography
                      noWrap
                    >{`Operator: ${mission.operator}`}</Typography>
                    <Typography
                      noWrap
                    >{`Vehichle: ${mission.launch.vehicle}`}</Typography>
                  </CardContent>
                  <CardActions className=" space-x-22">
                    <Button
                      className="self-start"
                      onClick={() => handleEditMissionOpen(key)}
                    >
                      <EditIcon className="text-white hover:scale-125 cursor-pointer "></EditIcon>
                    </Button>
                    <Button
                      className="self-end"
                      onClick={() => handleDeleteMission(key)}
                    >
                      <DeleteIcon className="text-white hover:scale-125 cursor-pointer "></DeleteIcon>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}
        <Dialog
          open={editMissionOpen}
          onClose={handleEditMissionClose}
          fullWidth
          className="bg-gradient-to-br from-cyan-900"
          maxWidth="sm"
        >
          <form onSubmit={onEdit}>
            <DialogTitle>Edit Mission</DialogTitle>

            <DialogContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <EditForm
                    editData={editData}
                    updateEditFields={updateEditFields}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={handleEditMissionClose}>
                Cancel
              </Button>

              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Tooltip title="New Mission">
          <Fab
            sx={{ position: "fixed", bottom: 16, right: 16, color: "#073448" }}
            aria-label="add"
            onClick={handleNewMissionOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "white",
              color: "#25727f",
            },
          }}
          open={newMissionOpen}
          onClose={handleNewMissionClose}
          fullWidth
          maxWidth="sm"
        >
          <form onSubmit={onSubmit}>
            <DialogTitle>New Mission</DialogTitle>

            <DialogContent>
              <Grid container direction="column" spacing={2}>
                {step}
              </Grid>
            </DialogContent>
            <DialogActions>
              {!isFirstStep ? (
                <Button type="button" onClick={back}>
                  back
                </Button>
              ) : (
                <Button type="button" onClick={handleNewMissionClose}>
                  Cancel
                </Button>
              )}
              <Button type="submit">{isLastStep ? "Finish" : "next"}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>

      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Missions };
