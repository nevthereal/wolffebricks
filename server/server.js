require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const DOMAIN = process.env.STORE_DOMAIN;

const getProductPrice = async (productId) => {
  try {
    const product = await stripe.products.retrieve(productId);
    const priceId = product.default_price;
    return priceId;
  } catch (error) {
    console.log(error);
  }
};

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  const userEmail = req.body.userEmail;
  let lineItems = [];
  for (const item of items) {
    const price = await getProductPrice(item.id);
    lineItems.push({
      price: price,
      quantity: item.quantity,
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    allow_promotion_codes: true,
    consent_collection: {
      terms_of_service: "required",
    },
    custom_text: {
      shipping_address: {
        message:
          "Depending on where you live, your orders can take a bit longer",
      },
      submit: {
        message: "We'll email you the instructions and partlists",
      },
    },
    success_url: `${DOMAIN}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DOMAIN}/cancel`,
    customer_email: userEmail,
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["US", "CH", "GB", "DE"],
    },
  });

  res.json({ url: session.url });
});

app.get("/order", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.orderId, {
    expand: ["line_items"],
  });
  res.json(session);
});

app.get("/product-data", async (req, res) => {
  const product = await stripe.products.retrieve(req.query.productId);
  res.json(product);
});

app.listen(4000, () => console.log("LISTENING ON PORT 4000"));
