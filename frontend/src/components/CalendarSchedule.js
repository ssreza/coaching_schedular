import  React, {useState, useRef, useEffect} from 'react';
import {Paper, Box, Grid, TextField,Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
function preventDefault(event) {
  event.preventDefault();
}

export default function CalendarSchedule({handleTimeSlot,user,schedule, userList}) {
  const [date_range, setDateRange]= useState({date_from: moment().startOf("week").format("YYYY-MM-DD"),
   date_until: moment().endOf("week").format("YYYY-MM-DD")});

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const times = ["9:00 am","10:00 am","11:00 am","12:00 pm","1:00 pm","2:00 pm","3:00 pm","4:00 pm","5:00 pm" ]
  const [timeSlots, setTimeSlots] = useState([])


  useEffect(() => { 
    let isSubscribed = true;
    console.log("schedule",schedule)
    const time_slots = [];
      for (let index = 0; index < times.length; index++) {
        let columns = [];
        const time = times[index];
        columns.push({type:"row_label", time:time})
        for (let j = 0; j < daysOfWeek.length; j++) {
            const date = moment(date_range.date_from).add(j,'days');
            let dateTime = date.format("YYYY-MM-DD ")+time;
            let available = "empty";
            let student = "", coach="";
            let scheduledtime = schedule.find(i => {
              let start_at = moment(i.start_at, "YYYY-MM-DD hh:mm a");
              let end_at = moment(i.end_at, "YYYY-MM-DD hh:mm a");
              if(moment(dateTime,"YYYY-MM-DD hh:mm a").isBetween(start_at,end_at,undefined, '[)')){
                return i;
              }
            });
            if(scheduledtime){
              available=(scheduledtime.available === true)? "available" :"reserved";
              student = userList.find(i=> i.userid === scheduledtime.student_id);
              coach = userList.find(i=> i.userid === scheduledtime.coach_id);
            }
            columns.push({type:"time_slot",
            dayOfweek:date.format("ddd"), 
            available, student,coach,
            date,
            time:dateTime})
          
        }
        time_slots.push({time,columns:columns})
      }
      console.log( "time_slots", time_slots)
      setTimeSlots(prev=> [...time_slots]);
    return () => {
      isSubscribed = false
    }
  }, [schedule])


  const weekView =()=>{

  }
  return (

     <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
     <Title>{user.name === null && "Please Select user to view "}Schedule</Title>
      {user.name !== null &&  (<Table sx={{ minWidth: 650 }} aria-label="Time Slots">
        <TableHead>
              
              {timeSlots[0].columns.map((col,index)=>{
                  if(index ===  0){
                    return (<TableCell >Time </TableCell>);
                  }else {
                    return (<TableCell>{col.dayOfweek}</TableCell>)
                  }
                })}
          
        </TableHead>
          <TableBody>
            {timeSlots.map((time_slot,index)=>{
              const columns = time_slot.columns.map(item=>{
                if(item.type === "row_label"){
                   return (<TableCell>{item.time}</TableCell>)
                }else {
                  if(user.user_type === "Coach"){
                    if(item.available === "empty" ){
                      return(<TableCell>
                        <Button
                          onClick={()=>{
                            handleTimeSlot(item)
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1, mb: 1 }}>
                        <AddIcon  />
                            Add
                        </Button>
                      </TableCell>)
                    }else {
                      return (<TableCell>
                        {item.available}
                       {item.available === "reserved" &&  " by "+item.student.name} <br/>
                      {item.time} </TableCell>)
                    }
                  }else if(user.user_type === "Student"){
                    if(item.available === "available"){
                      return (<TableCell>{item.time} {item.available}<br/>
                       <Button
                          onClick={()=>{
                            handleTimeSlot(item)
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1, mb: 1 }}>
                        <AddIcon  />
                            Reserve
                        </Button>
                      </TableCell>)
                    }else {
                      return (<TableCell> Not available</TableCell>)
                    }
                  }
                }
              })
              
              return (<TableRow key={index}>{columns}</TableRow>);
            })}
          </TableBody>
        </Table>
    
 )}
    </Paper>
  );
}
