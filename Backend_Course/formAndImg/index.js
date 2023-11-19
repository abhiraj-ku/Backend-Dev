const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
// const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "viewhub",
  api_key: "253923537927214",
  api_secret: "OsKd3SLG1BzM3tR1tWGpQ3rzp_s",
});

//path for img upload
// const tempFolderPath = path.join(__dirname, "temp");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //neccesary for form encoded data
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
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
app.post("/postit", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.body);
  console.log(req.files); //this was to upload the files to the temp folder of our project dir
  // const uploadedFile = req.files.image;
  // const originalFileName = uploadedFile.name;
  // const filePath = path.join(tempFolderPath, originalFileName);
  // uploadedFile.mv(filePath, (err) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }
  // });

  //for cloudinary single file upload
  // let file = req.files.samplefile;
  // const result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: "users",
  // });

  //for multiple files upload
  let result;
  let imagesArray = [];

  if (req.files) {
    for (let i = 0; i < req.files.samplefile.length; i++) {
      let uploadedImages = await cloudinary.uploader.upload(
        req.files.samplefile[i].tempFilePath,
        {
          folder: "users",
        }
      );
      imagesArray.push({
        public_id: uploadedImages.public_id,
        secure_url: uploadedImages.secure_url,
      });
    }
  }

  //details object to be send after the upload part
  const details = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    result,
    imagesArray,
  };
  console.log(details);
  res.send(details);
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
