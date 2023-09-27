const express = require("express");
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.send("<h1>About Me :fdfdfdfsgfgfgfgfgfvcvcbvbggsfdzdgfsgdsgds </h1>");
});

//Redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
