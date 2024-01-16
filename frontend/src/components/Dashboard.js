import React, {useState, useEffect}  from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


import PastCalls from './PastCalls';
import { Button } from '@mui/material';
import SignInModal from './SignInModal';
import {getUsers, getSchedule,addSchedule} from "../services/dataService";
import ScheduleModal from './ScheduleModal';
import moment  from "moment";
import CalendarSchedule from './CalendarSchedule';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const defaultTheme = createTheme();

export default function Dashboard() {
  const [selectUserModelOpen, setSelectUserModelOpen] = useState(false);
  const [userList, setUserList] = useState({})
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useState({
      name:null, type:"Student", email:null
  });
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  let loggedIn = user.name ? true : false;
  const refresh = async ()=>{
    
    const userList = await getUsers();
    setUserList(prev=> [...userList]);
    const schedule = await getSchedule();
    setSchedule(prev=> {
      return [...schedule]
    });
   
  }
  const [timeSlot, setTimeSlot] = useState({});
    useEffect(() => {
    refresh()
    return () => {
      
    }
  }, [])

  const handleTimeSlot =  (time_slot)=>{
    if(!loggedIn){
      setSelectUserModelOpen(true);
    }else {
      setTimeSlot(time_slot);
      if(user.user_type === "Coach"){
        setOpenScheduleModal(true);
      }
      if(user.user_type === "Student"){
        setOpenScheduleModal(true);
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
   
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
             {user.user_type} Dashboard
            
            </Typography>
              <Typography   component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Welcome {user.name}
              </Typography>
            <Button color="inherit" onClick={(e)=>{
              e.preventDefault();
              setSelectUserModelOpen(true);
            }}
            > {loggedIn ? "Switch User" : "Select User" } </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
              <Grid item xs={12} md={12} lg={12}>
               <CalendarSchedule  user={user} userList={userList}
               schedule={schedule} handleTimeSlot={handleTimeSlot} />
              </Grid>
              
            </Grid>
          </Container>
        </Box>
      </Box>
      <SignInModal modalOpen={selectUserModelOpen} 
       setUser={setUser} handleClose={
        ()=>{
        setSelectUserModelOpen(false)
        refresh()
      }}/>
       <ScheduleModal modalOpen={openScheduleModal} userList={userList} timeSlot={timeSlot} 
       user={user} handleClose={
        ()=>{
        setOpenScheduleModal(false)
        refresh()
      }}/>
    </ThemeProvider>
  );
}
