const db = require('./db');
async function findTimeSlot(data){
    const searchString = `SELECT * FROM TimeSlots WHERE start_at = '${data.start_at}' and end_at = '${data.end_at}'`;
    const result = await db.query(searchString);
    console.log("found schedule", result.rows);
    return result.rows;
}

async function addTimeSlot(data){
 
    let available = (data.available) ? 1 : 0 ; 
    // await db.query(insertString);
    const insertString = db.knex('timeslots')
        .insert(data)
        .returning('*')
        .toString();
    await db.query(insertString)
    
    const searchString = `SELECT * FROM TimeSlots WHERE 
    start_at = '${data.start_at}'  AND end_at = '${data.end_at}'`;
    const result = await db.query(searchString);
    console.log("added", result.rows);
    return result.rows[0];

}

async function updateTimeSlot(data){
    let {timeslotid} = data;
    delete data.timeslotid;
    const insertString = db.knex('timeslots')
        .where('timeslotid', '=', timeslotid)
        .update(data)
        .returning('*')
        .toString();
    await db.query(insertString)
    
    const searchString = `SELECT * FROM TimeSlots WHERE start_at = '${data.start_at}'  AND end_at = '${data.end_at}'`;
    const result = await db.query(searchString);
    console.log("added", result.rows);
    return result.rows[0];

}

module.exports = {
    findTimeSlot,
    addTimeSlot,
    updateTimeSlot,
  };