var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

// import DBs
var userDB = require('../model/userDB.js');

app.get('/user/:id', async function (req, res) {
    var id = req.params.id;
    try {
        const data = await userDB.getUserByID(id);
        if (data.rowCount > 0) {
            res.send(data.rows)
        }else{
            res.send("dosent exist");
        }
    } catch (e) {
        console.log(e)
        res.status(500);
        res.send(`{"message":"Internal Error"}`);
        return;
    }

    userDB.getUserByID(id, (err, results) => {
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Error"}`);
            return;
        }
        if (results.length === 0) {
            //userid does not exist
            res.status(404).send(`{"message":"The userid: ${id} does not exists!!"}`);
            return;
        }
        res.status(200);
        res.send(results);
    });
});

module.exports = app;