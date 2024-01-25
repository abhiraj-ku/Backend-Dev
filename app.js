const express = require("express");
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("hello lawde");
});
app.get("/about", (req, res) => {
  res.send("About Me");
});

//Redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
