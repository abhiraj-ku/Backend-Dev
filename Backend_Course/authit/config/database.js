const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTION SUCCESFULL"))
    .catch((err) => {
      console.log(err);
      console.log("DB CONNECTION FAILED");
      process.exit(1);
    });
};
