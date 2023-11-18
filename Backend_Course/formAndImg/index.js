const express = require("express");
const app = express();

app.use(express.json());
// app.use(express.urlencoded());

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("hello from abhishek");
});

app.get("/getit", (req, res) => {
  console.log(req.body);
  res.send(req.body);
  // res.send(req.query);
});

app.get("/getform", (req, res) => {
  res.render("getform");
  // res.render(req.query);
});
app.get("/postform", (req, res) => {
  res.render("postform");
});

//server running instance
app.listen(4000, () => {
  console.log(`server is running at port 4000`);
});
