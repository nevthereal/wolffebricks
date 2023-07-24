require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

const app = express()
app.use(cors());
app.use(express.static('public'))
app.use(express.json())


const DOMAIN = process.env.STORE_DOMAIN; // Add the missing 'const' keyword

app.post("/checkout", async (req, res) => {
  const items = req.body.items
  const userEmail = req.body.userEmail
  let lineItems = []
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity
    })
  })

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    allow_promotion_codes: true,
    success_url: `${DOMAIN}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DOMAIN}/cancel`,
    customer_email: userEmail,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'CH', 'GB', 'DE'],
    },  
  })
  
  res.json({ url: session.url })
})

app.listen(4000, () => console.log("LISTENING ON PORT 4000"))