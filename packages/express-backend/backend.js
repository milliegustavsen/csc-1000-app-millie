import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});


const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) return undefined;
  return users.users_list.splice(index, 1)[0];
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = deleteUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(200).send("user deleted");
  }
});

const findUserByNameJob = (name, job) => {
  return users.users_list.find(
    (user) => user.name === name && user.job === job
  );
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    const user = findUserByNameJob(name, job);

    if (!user) return res.status(404).send("Resource not found.");

    return res.send({ users_list: [user] });
  }

  if (name) {
    return res.send({ users_list: findUserByName(name) });
  }

  res.send(users);
});

app.get("/", (req, res) => {
  res.send(users);
});

// app.get("/users", (req, res) => {
//   res.send(users);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// deleted this from json but might need it? "type": "commonjs",
// to debug: $env:DEBUG='express:router'; npx nodemon backend.js