const db = require('./db');
async function findUserQuery(email, user_type){
    const searchString = `SELECT * FROM Users WHERE email = '${email}' AND user_type = '${user_type}'`;
    const result = await db.query(searchString);
    console.log("found user", result.rows);
    return result.rows;
}
async function addUserQuery(data){
    const insertString = `INSERT INTO Users (name, email, user_type)
    VALUES
    ('${data.name}', '${data.email}', '${data.user_type}');`
   
    await db.query(insertString);
    const searchString = `SELECT * FROM Users WHERE email = '${data.email}'`;
    const result = await db.query(searchString);
    console.log("added", result.rows);
    return result.rows[0];
}

module.exports = {
    findUserQuery,
    addUserQuery,
   
  };