const app = require("./app");
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`server is listening at port:${PORT}`);
});
