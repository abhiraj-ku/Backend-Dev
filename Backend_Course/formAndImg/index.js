const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

//path for img upload
const tempFolderPath = path.join(__dirname, "temp");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //neccesary for form encoded data
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempFolderPath,
  })
);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("hello from abhishek");
});

app.get("/getit", (req, res) => {
  console.log(req.body);

  // res.send(req.body);    //for normal (react,js) the data is recieved via req.body
  res.send(req.query); // for templates its req.query where data is send
});
app.post("/postit", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // console.log(req.body);
  console.log(req.files);
  const uploadedFile = req.files.image;
  const originalFileName = uploadedFile.name;
  const filePath = path.join(tempFolderPath, originalFileName);
  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  res.send(req.body);
});

//routes to render form
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
