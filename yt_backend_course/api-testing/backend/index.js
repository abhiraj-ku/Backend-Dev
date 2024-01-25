import express from "express";
const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server running at port : ${port}`);
});

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      price: 549,
      Image: "https://i.dummyjson.com/data/products/1/1.jpg",
    },
    {
      id: 2,
      title: "iPhone X",
      price: 899,
      Image: "https://i.dummyjson.com/data/products/2/1.jpg",
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      price: 1249,
      Image: "https://i.dummyjson.com/data/products/3/1.jpg",
    },
    {
      id: 4,
      title: "OPPOF19",
      price: 280,
      Image: "https://i.dummyjson.com/data/products/4/1.jpg",
    },
    {
      id: 5,
      title: "Huawei P30",
      price: 499,
      Image: "https://i.dummyjson.com/data/products/5/1.jpg",
    },
    {
      id: 6,
      title: "MacBook Pro",
      price: 1749,
      Image: "https://i.dummyjson.com/data/products/6/1.png",
    },
  ];

  if (req.query.search) {
    const filterProducts = products.filter((product) =>
      product.title.includes(req.query.search)
    );
    res.send(filterProducts);
    return;
  }

  res.send(products);
});
//hello
//hello world
//Hello Javascript
//
