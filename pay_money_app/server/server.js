const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static("public"));

const storeItem = new Map([
  [1, { priceInCents: 100, name: "Learn js today course" }],
  [2, { priceInCents: 200, name: "Learn node js  today course" }],
]);

// Define routes and middleware here
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: ["payment"],
      line_item: req.body.items.map((item) => {
        const storeItem = storeItem.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.get(item.id),
            },
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
