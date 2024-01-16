const express = require('express');
const db = require('./db');
const cors = require('cors');
const scheduleService = require('./scheduleService');
const app = express();
const userService = require("./userService");

app.use(cors())
app.use(express.json())   
app.get('/api/users', async (req, res) => {
    try {
        // console.log(req.query.email)
        const searchString = `SELECT * FROM Users`;
        const result = await db.query(searchString);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
app.post('/api/select_user', async (req, res) => {
    try {
        let usersExist = await userService.findUserQuery(req.body.email, req.body.user_type);
        if(usersExist.length> 0){
        
            res.send(usersExist[0])
        }else {
            const user = await userService.addUserQuery(req.body);
            res.send(user)
        }
      
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
   
})

app.post('/api/add_time_slot', async (req, res) => {
    try {
        let data = req.body;
        let scheduleExist = await scheduleService.findTimeSlot(data);
        if(scheduleExist.length> 0){
            const schedule = await scheduleService.updateTimeSlot(scheduleExist[0])
            res.send(schedule)
        }else {
            const timeSlot = await scheduleService.addTimeSlot(data);
            res.send(timeSlot)
        }
      
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
   
})

app.get('/api/get_schedule', async (req, res) => {
    try {
        // console.log(req.query.email)
        const searchString = `SELECT * FROM TimeSlots`;
        const result = await db.query(searchString);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(8080, () => {
      console.log('server listening on port 8080')
})