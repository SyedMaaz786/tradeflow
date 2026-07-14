const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("/etc/secrets/firebase-service-account.json");

initializeApp({
  credential: cert(serviceAccount),
});
