// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const Users = require("./users/model");

server.use(express.json());

server.get("/api/users", async (req, res) => {
  let users = await Users.find();
  try {
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  let user = await Users.findById(req.params.id);
  try {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.post("/api/users", async (req, res) => {
  let newUser = await Users.insert(req.body);
  try {
    if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

module.exports = server;
