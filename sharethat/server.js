import express from "express";
const app = express();
import multer from "multer";
import bcrypt from "bcryptjs";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDb from "./config/dbConnect.js";
import File from "./models/file.js";
import downloadLimit from "./utils/downloadLimit.js";

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const upload = multer({ dest: "uploads" });

// DB connection
connectDb();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password != "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }
  const file = await File.create(fileData);
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id);

  downloadLimit(req);

  if (file.password != null) {
    if (req.body.password == null) {
      res.render("password");
      return;
    }

    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.render("password", { error: true });
      return;
    }
  }

  file.downloadCount++;
  await file.save();
  console.log(
    "this ",
    file.originalName,
    "has been dowloaded",
    file.downloadCount,
    "times so far"
  );

  res.download(file.path, file.originalName);
}

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ...4500`);
});
