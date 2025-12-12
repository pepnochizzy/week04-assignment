//TODO: set up server
//imports✔, configs✔, port✔, root rout✔
import express, { response } from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`server running on port:${PORT}`);
});

app.get("/", (req, res) => {
  res.json(`Welcome to the root route!`);
});

app.post("/create-post", (req, res) => {
  //recieve the data
  const newPost = req.body.formValues;
  console.log(newPost);
  //insert into table- make new table
  const query = db.query(
    `INSERT INTO posts (name, location, date, type, species, info) VALUES($1, $2, $3, $4, $5, $6)`,
    [
      newPost.name,
      newPost.location,
      newPost.date,
      newPost.animal,
      newPost.species,
      newPost.info,
    ]
  );
  res.json({ status: "success!", values: newPost });
});

app.get("/create-post", async (req, res) => {
  const query = await db.query(
    `SELECT name, location, date, type, species, info FROM posts`
  );
  res.json(query.rows);
  console.log(res.json(query.rows));
});
