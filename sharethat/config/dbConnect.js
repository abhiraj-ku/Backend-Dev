import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`DB Connected successfully!`);
  } catch (err) {
    console.error(`DB Connection issue`);
    console.error(err);
    process.exit(1);
  }
}

export default connectDb;
