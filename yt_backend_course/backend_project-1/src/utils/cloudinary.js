import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//function to upload files on multer
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //uploading ans saving the response in a var
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded sucessfully
    console.log("file is uploaded sucessfully", response.url);
    return response; //for frontend to handle
  } catch (error) {
    // the local file should be deleted
    fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
