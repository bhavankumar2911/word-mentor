if (process.env.NODE_ENV !== "production") require("dotenv").config();

const next = require("next");
const { addWord, updateWord, fetchWords, deleteWord } = require("./controller");
const express = require("express");
const db = require("./db");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = () => {
  let app = express();

  // checking db connection
  db.authenticate()
    .then(() => console.log("connected"))
    .catch((err) => console.log("error", err));

  app.use(express.json());

  // add word
  app.post("/api", addWord);

  // fetch words
  app.get("/api", fetchWords);

  // update word
  app.put("/api/:id", updateWord);

  // delete word
  app.delete("/api/:id", deleteWord);

  // next router
  app.get("*", (req, res) => handle(req, res));

  app.listen(3000, () => console.log("server listening on port 3000"));
};

app.prepare().then(() => {
  server();
});
