import express from "express";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index", { mess: "ok html is ready", age: 99 });
});

app.listen(3000);
