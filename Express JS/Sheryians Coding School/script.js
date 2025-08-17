import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log("middle ware");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/aa", (req, res) => {
  res.render("index",{name:"ujjwal", age:99});
});
app.get("/about/student/:studentName", (req, res) => {
  res.send(`hello you are ${req.params.studentName}`);
});

app.listen(3000);
