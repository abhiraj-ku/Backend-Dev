const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 499,
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to the world of ecastasy");
});

app.get("/api/v1/arko", (req, res) => {
  res.send("Hello from Arko sols");
});

app.get("/api/v1/arkoobject", (req, res) => {
  res.send({ id: "55", name: "Learn Backend", price: 8000 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send({ courses });
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
