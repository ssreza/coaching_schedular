import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {selectUser} from "../services/dataService";
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

export default function SignInModal({modalOpen,handleClose, setUser}) {
  const [errors, setErrors] = useState({})
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try {
      const selected_user = await selectUser(Object.fromEntries(data));
      console.log(selected_user)
      setUser(selected_user);
    } catch (error) {
      console.log(error)
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
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit}
               noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="Student"
                  name="user_type"
                  id="user_type"
                >
                  <FormControlLabel value="Student" control={<Radio />} label="Student" />
                  <FormControlLabel value="Coach" control={<Radio />} label="Coach" />

                </RadioGroup>
                <Button
                  type="submit"
                
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
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
