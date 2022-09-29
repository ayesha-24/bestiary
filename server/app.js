const express = require("express");
const cors = require("cors");

let beasts = require("./beasts");
const logRoute = require("./route-logger");

// Make a basic server
const app = express();
// Allow requests from other origins
app.use(cors());
// Tell Express to always read the body of POST requests
app.use(express.json());

//Add middleware to log routes
app.use(logRoute);

// Set up the server routes
app.get("/", (req, res) => {
  res.send("Welcome to the Bestiary!");
});

app.get("/beasts", (req, res) => {
  res.send(beasts);
});

app.get("/beasts/random", (req, res) => {
  const randomBeast = beasts[Math.floor(Math.random() * beasts.length)];
  res.send(randomBeast);
});

app.get("/beasts/:id", (req, res) => {
  try {
    //Attempt to do something - stop if there's an error

    // Convert the id into an int (which possibly makes a NaN)
    const id = parseInt(req.params.id);

    // If the if is a NaN or other bad value
    if (isNaN(id)) {
      // Exit the try, because we found a problem
      throw "Invalid input!";

      // If the id is outside the reasonable boundaries
    } else if (id < 0 || id >= beasts.length) {
      // Exit the try because we found a problem
      throw "No such beast!";
    }

    // If everything is fine, just return the relevant beast
    const filtered = beasts.filter((b) => b.id == req.params.id);
    res.send(filtered[0]);

    // If there was a problem anywhere in the try, take the error information
  } catch (e) {
    // Send a response explaining the issue
    res.status(404).send({ error: e });
  }
});

app.post("/beasts", (req, res) => {
  //Grab the beast data
  const newBeast = req.body;

  // Select an ID for the beast
  newBeast["id"] = beasts.length;

  //Add to the list of beasts
  beasts.push(newBeast);

  //Return a message saying it worked
  res.status(201).send(newBeast);
});

// app.delete("beasts/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const beasts = beasts.filter((b) => b.id != id);
//   res.send({ message: "Beast banished." });
// });

app.delete("/beasts/:id", (req, res) => {
  // get the id out of the URL:
  const deleteId = parseInt(req.params.id);
  // find method to see if bests contains an element with the id
  const deleted = beasts.find((beast) => beast.id === deleteId);
  if (deleted) {
    // if "deleted" exists, filter beasts and only get ones who's id doesn't match the one to delete
    beasts = beasts.filter((beast) => beast.id !== deleteId);
    // return deleted beast
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: "Beast does not exist" });
  }
});

module.exports = app;
