import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("Resource not found.");
      }

      res.json(user);
    })
    .catch((error) => {
      res.status(500).send("Database error."); // used ChatGPT to find what error to send
    });
});

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Database error.");
    });
});

app.delete("/users/:id", (req, res) => {
  userServices
    .removeUser(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).send("Resource not found.");
      }

      res.status(204).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Database error.");
    });
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job)
    .then((users) => {
      res.json({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Database error.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// to debug: $env:DEBUG='express:router'; npx nodemon backend.js