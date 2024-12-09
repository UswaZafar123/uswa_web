const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51QTOHdBicms9V609pMjQut63LTJMObRbodALPAipidqDA58bt6sZvMnbd6phTDpdQiwXtWgoAqrjwae2I8yISV9Q00s9pAZ2oK");

router.post("/payments/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
