import express from "express";
import cors from "cors";
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

//TODO: set up server
//imports, configs, port, root rout

//TODO:
//link to server and database
