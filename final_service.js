/*
 Laan Rose
 CSC 337
 Final Project
 Checkers
 
 JS service code for the Checkers final project. Saves checkers games to game.txt, and can
 load from the same file as well.
*/

"use strict";

let fs = require('fs');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

/** Returns the contents of game.txt as a string.
    @returns {string} the save game data
*/
function getSaveData() {
    let data = "X";
    let url = "game.txt";

    try {  
        data = fs.readFileSync(url, 'utf8');
    } catch(e) {
        console.log('Error in getMessages:', e.stack);
    }
    
    return data;
}

/** Handles requests to get all messages stored in messages.txt. */
console.log('web service started');
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    
    // Return value.
    let out = "";
    
    let param = req.query.param;
    alert("e");
    
	// returns an error if one of the parameters is missing
	if(param == undefined) {
		res.status(400);
		res.send("Missing required parameters!!!");
	}
    
    // Get all messages.
    if (param == "load") {
        out = getSaveData();
    }

    res.send(out);
});

/** Adds any given messages and names to messages.txt. */
app.post('/', jsonParser, function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    
	let save = req.body.savedata;
    
    // Add new name/message to file.
	fs.writeFile("game.txt", save, function(err) {
        if(err) {
            res.send("Error trying to update game.txt!");
            return console.log(err);
        }
        else {
            res.send("game.txt successfully updated!");
        }
    });
});

app.listen(process.env.PORT);

