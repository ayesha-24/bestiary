const express = require('express');

const beasts = require("./beasts")

// Make a basic server
const app = express();

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

module.exports = app;
