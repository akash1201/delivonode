const { Payouts } = require("@cashfreepayments/cashfree-sdk");

// Instantiate Cashfree Payouts
const payoutsInstance = new Payouts({
  env: "TEST",
  clientId: "16160477b0523e78d1bb66d27b406161",
  clientSecret: "0e2826108299668d42fde9350402e2a9f8e1eb2f",
  pathToPublicKey: "/path/to/your/public/key/file.pem",
  //"publicKey": "ALTERNATIVE TO SPECIFYING PATH (DIRECTLY PASTE PublicKey)"
});

Payouts.verifySignature(webhookPostDataJson, signature, clientSecret); // returns true or false
