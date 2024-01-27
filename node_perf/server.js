const express = require("express");
const cluster = require("cluster");
const app = express();
const numCPUs = require("os").cpus().length;
console.log(numCPUs);
function delay(dur) {
  const startTime = Date.now();
  while (Date.now() - startTime < dur) {
    // console.log("hello world");
  }
}

app.get("/", (req, res) => {
  res.send(`Performance homepage managed by : ${process.pid}`);
});
app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Timer homepage managed by : ${process.pid}`);
});

// Worker thread
console.log("running server js");
if (cluster.isMaster) {
  console.log("Master thread started");
  // cluster.fork();
  cluster.fork();
} else {
  console.log("Worker thread started");
  app.listen(9000, () =>
    console.log(`sever is up and running at port 9000.....`)
  );
}
