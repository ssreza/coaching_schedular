import React, {useState} from 'react';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';import Modal from '@mui/material/Modal';
import moment from "moment";
import {addTimeSlot} from "../services/dataService";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function ScheduleModal({modalOpen,handleClose,user, timeSlot,userList}) {
    const [selectedCoach, setSelectedCoach] = useState("");
    console.log(userList);
    let Label = "";
    if(user.user_type === "Coach"){
      Label = `Set ${timeSlot.time} to Available`;
    }
    if(user.user_type === "Student"){
      Label = `Book Time Slot ${timeSlot.time} with couch`;
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(user.user_type === "Coach"){
        const time_slot =  addTimeSlot({
          start_at:timeSlot.time,
          end_at:moment(timeSlot.time, "YYYY-MM-DD hh:mm a").add(2,"hours").format("YYYY-MM-DD hh:mm a"),
          available:true,
          coach_id:user.userid,
          student_id:null
        })
      } else if(user.user_type === "Student")  {
        addTimeSlot({
          start_at:timeSlot.time,
          end_at:moment(timeSlot.time, "YYYY-MM-DD hh:mm a").add(2,"hours").format("YYYY-MM-DD hh:mm a"),
          coach_id:selectedCoach,
          available:false,
          student_id:user.userid
        })
      }
      
      
      handleClose()
    };
  
    return (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
              <Box
                sx={style}
              >
                <Typography component="h1" variant="h5">
                  {Label}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}
                 noValidate sx={{ mt: 1 }}>
                  <Box>
                    {user.user_type === "Student" && ( <FormControl fullWidth>
                      <InputLabel id="coach">Coach</InputLabel>
                      <Select
                        labelId="coach"
                        id="coach-select"
                        value={selectedCoach}
                        label="Coach"
                        onChange={(e)=>{
                          setSelectedCoach(e.target.value);
                        }}
                      >
                        {userList.map(item=> {
                          if(item.user_type === "Coach"){
                            return  ( <MenuItem key={item.userid} 
                              value={item.userid}>{item.name}</MenuItem>)
                          }
                        })}
                      </Select>
                  </FormControl>)}
                  </Box>
                  <Button
                    type="submit"
                  
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                  <Button onClick={handleClose}
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }} style={{marginLeft:"20px"}}
                  >
                   Cancel
                  </Button>
                </Box>
              </Box>
        </Modal>    
        
    );
}

export default ScheduleModal
