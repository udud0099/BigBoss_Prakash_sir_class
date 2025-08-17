// console.log("Hi bro");

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("ok here");
  // res.status(500).send("ok");
  res.render("index", { text: "World" });
  //   res.send("ok i am ready");
});

app.listen(3000);
