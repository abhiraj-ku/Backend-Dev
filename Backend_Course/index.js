const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//home Route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello bhen ke lawde</h1>");
});

//instagram object json
app.get("/api/v1/instagram", (req, res) => {
  const insta = {
    userName: "@abhi1_6_9",
    followers: 1000,
    follows: 30,
    Date: new Date().toLocaleTimeString("en-US", { hour12: true }),
  };
  res.status(200).json({ insta });
});

//Linkedin object json
app.get("/api/v1/linkedin", (req, res) => {
  const linkedin = {
    userName: "abhirajabhi312",
    followers: 1334,
    follows: 1000,
    Date: new Date().toLocaleTimeString("en-US", { hour12: true }),
  };
  res.status(200).json({ linkedin });
});

//twitter object json
app.get("/api/v1/twitter", (req, res) => {
  const twitter = {
    userName: "@abhirajabhi312",
    followers: 13,
    follows: 300,
    Date: new Date().toLocaleTimeString("en-US", { hour12: true }),
  };
  res.status(200).json({ twitter });
});

//params in url
app.get("/api/v1/:token", (req, res) => {
  const param = req.params.token;
  res.status(200).json({ param });
});

//server listens
app.listen(port, () => {
  console.log(`Server is up and running at port:${port}`);
});
