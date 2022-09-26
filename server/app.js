const express = require('express');
const cors = require('cors');

const beasts = require("./beasts");

// Make a basic server
const app = express();
// Allow requests from other origins
app.use(cors());
// Tell Express to always read the body of POST requests
app.use(express.json());

// Set up the server routes
app.get("/", (req, res) => {
    res.send("Welcome to the Bestiary!");
});

app.get("/beasts", (req, res) => {
    res.send(beasts);
});

app.get("/beasts/random", (req, res) => {
    const randomBeast = beasts[Math.floor(Math.random()*beasts.length)];
    res.send(randomBeast);
});

app.get("/beasts/:id", (req, res) => {
    const filtered = beasts.filter(b => b.id == req.params.id);
    res.send(filtered[0]);
});

app.post("/beasts", (req, res) => {
    //Grab the beast data
    const newBeast = req.body;

    //Add to the list of beasts


    //Return a message saying it worked
    res.send(newBeast)

})

module.exports = app;
