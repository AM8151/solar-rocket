import "../App.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
//import * as weather from '../assets/img/weather.jpg'
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  RocketLaunch as RocketLaunchIcon,
  WbSunny as WbSunnyIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const drawerWidth: number = 250;

interface pageProps {
  children: React.ReactNode;
  title?: string;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({

  flexGrow: 1,
  backgroundColor: 'transparent',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zmarginLeft: 0,
   
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
}));

const AppLayout: React.FC<pageProps> = ({ children, title }) => {
  const [pageName, setPageName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  let location = useLocation();

  useEffect(() => {
    setPageName(location.pathname);
    console.log(location.pathname);
  }, [location]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
 

  return (


    <Box   style={{ 
      backgroundImage: pageName === "/missions" ? `url("https://www.nasa.gov/sites/default/files/thumbnails/image/solar_electric_propulsion_0.jpg")` : `url("https://cdn.wallpapersafari.com/60/91/1m3bOH.jpg")`,
      backgroundPosition: 'center',
      backgroundRepeat: "no-repeat",
      height: '100%',
      backgroundSize: 'cover',
      width: '100%'
    }} className="div" sx={{ display: "flex" }}>
      
      <Helmet>
        {title ? (
          <title>
            {title} | {process.env.REACT_APP_TITLE}
          </title>
        ) : (
          ""
        )}
      </Helmet>
      <CssBaseline  />
      <AppBar   style={{backgroundColor: "transparent", padding: 2, fontSize: "0.8em", color: "white"}}
        position="fixed"
        open={drawerOpen}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Solar Rocket
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
      
        className="text-white"
        PaperProps={{ elevation: 5,
          style: {
            backgroundColor: '#00000000',
            color: '#25727f'
            //boxShadow: 'none',
          },
        }}
        anchor="left"
        open={drawerOpen}
        sx={{
          zwidth: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
           
          },
        }}
      >
        <List className="text-white  " sx={{ mt: 6 }}>
          {[
            { text: "Home", icon: <HomeIcon className="text-white  " />, link: "/" },
            {
              text: "Missions",
              icon: <RocketLaunchIcon className="text-white  " />,
              link: "/missions",
            },
            { text: "Weather", icon: <WbSunnyIcon className="text-white  " />, link: "/weather" },
            {
              text: "Preferences",
              icon: <SettingsIcon className="text-white  "/>,
              link: "/preferences",
            },
          ].map((item, index) => (
            <Link       className="text-white"
              component={RouterLink}
              to={item.link}
              key={index}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon  >{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: pageName === item.link ? "bold" : "light",
                  }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main   open={drawerOpen} ><DrawerHeader />{children}</Main>
    </Box>

  );
};

export { AppLayout };
