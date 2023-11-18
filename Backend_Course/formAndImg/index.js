const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  // console.log("hello from abhi");
  res.send("hello");
});

app.get("/getit", (req, res) => {
  console.log(req.body);

  res.send(req.body);
});
app.listen(6000, () => {
  console.log(`server is running at port 6000`);
});
