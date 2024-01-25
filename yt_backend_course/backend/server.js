import express from "express";
const app = express();
const port = process.env.PORT || 4000;

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "this is title 1",
      content: "this is funny joke num 1",
    },
    {
      id: 2,
      title: "this is title 2",
      content: "this is funny joke num 2",
    },
    {
      id: 3,
      title: "this is title 3",
      content: "this is funny joke num 3",
    },
    {
      id: 4,
      title: "this is title 4",
      content: "this is funny joke num 4",
    },
    {
      id: 5,
      title: "this is title 5",
      content: "this is funny joke num 5",
    },
  ];
  res.send(jokes);
});

app.listen(port, () => {
  console.log(`server is listening at port: ${port}`);
});
