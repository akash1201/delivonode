const { Payouts } = require("@cashfreepayments/cashfree-sdk");
import asyncHandler from "express-async-handler";
// import PaymentGateway from "@cashfreepayments/cashfree-sdk";
const asyncHandler = require("express-async-handler");
const sdk = require("api")("@cashfreedocs-new/v2#97f8kl3sscv9e");

// Instantiate Cashfree Payouts
const payoutsInstance = new Payouts({
  env: "TEST",
  clientId: "16160477b0523e78d1bb66d27b406161",
  clientSecret: "0e2826108299668d42fde9350402e2a9f8e1eb2f",
  pathToPublicKey: "/path/to/your/public/key/file.pem",
  //"publicKey": "ALTERNATIVE TO SPECIFYING PATH (DIRECTLY PASTE PublicKey)"
});

Payouts.verifySignature(webhookPostDataJson, signature, clientSecret); // returns true or false


sdk.server("https://api.cashfree.com/pg");
sdk
  .CreateOrder(
    {
      order_id: "string",
      order_amount: 10.15,
      order_currency: "INR",
      customer_details: {
        customer_id: "7112AAA812234",
        customer_email: "john@cashfree.com",
        customer_phone: "9908734801",
        customer_bank_account_number: "1518121112",
        customer_bank_ifsc: "CITI0000001",
        customer_bank_code: 3333,
      },
      order_meta: {
        return_url:
          "https://b8af79f41056.eu.ngrok.io?order_id={order_id}&order_token={order_token}",
        notify_url: "https://b8af79f41056.eu.ngrok.io/webhook.php",
      },
      order_expiry_time: "2021-07-29T00:00:00Z",
      order_note: "Test order",
    },
    {
      "x-client-id": "208118e1ccc5ab57289542b19d811802",
      "x-client-secret": "95697f4003e1f962f28d8f04f91616ee62dff54e",
      "x-api-version": "2022-01-01",
    }
  )
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

const generateOrderToken = asyncHandler(async (req, res) => {});

export { generateOrderToken };
