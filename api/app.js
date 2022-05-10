/**
 * Created by 17-1336 on 5/11/22.
 */
/**
 * Created by 17-1336 on 5/9/22.
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

/*------------------------------------------
 --------------------------------------------
 parse application/json
 --------------------------------------------
 --------------------------------------------*/
app.use(bodyParser.json());

/*------------------------------------------
 --------------------------------------------
 Database Connection
 --------------------------------------------
 --------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: '', /* MySQL Password */
    database: 'dbuser' /* MySQL Database */
});

/*------------------------------------------
 --------------------------------------------
 Shows Mysql Connect
 --------------------------------------------
 --------------------------------------------*/
conn.connect((err) =>{
    if(err) throw err;
console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/users',(req, res) => {
    let sqlQuery = "SELECT * FROM users";

let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
res.send(apiResponse(results));
});
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/users/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;

let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
res.send(apiResponse(results));
});
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/users',(req, res) => {
    let data = {fname: req.body.firstname,lname: req.body.lastname,addr:req.body.address,postcode:req.body.postcode,phone:req.body.phoneNumber,uname:req.body.username,email:req.body.email,pwd:req.body.password};

let sqlQuery = "INSERT INTO users SET ?";

let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
res.send(apiResponse(results));
});
});

/**
 * Update Item
 *
 * @return response()
 */

app.put('/api/users/:id',(req, res) => {
    let sqlQuery = "UPDATE users SET fname='"+req.body.firstname+"', lname='"+req.body.lastname+"', addr='"+req.body.address+"', postcode='"+req.body.postcode+"', phone='"+req.body.phoneNumber+"', uname='"+req.body.username+"', email='"+req.body.email+"', pwd='"+req.body.password+"' WHERE id="+req.params.id;

let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
res.send(apiResponse(results));
});
});



/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/users/:id',(req, res) => {
    let sqlQuery = "DELETE FROM users WHERE id="+req.params.id+"";

let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
res.send(apiResponse(results));
});
});



/**
 * Get multiple Item
 *
 * @return response()
 */
app.get('/api/users/{"ids": []}',(req, res) => {
    const names = req.query.ids.split(';');
    console.log(names);
    res.send({ text: 'Hello World'+names });
//});
});



/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

/*------------------------------------------
 --------------------------------------------
 Server listening
 --------------------------------------------
 --------------------------------------------*/
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});/**
 * Created by 17-1336 on 5/9/22.
 */
/**
 * Created by 17-1336 on 5/9/22.
 */
