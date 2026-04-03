const admin = require("firebase-admin");
const serviceAccount = require("./exoticmart-cf592-firebase-adminsdk-fbsvc-ecabe9c8d9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = "SwpqxBtNMtcuiQvMhTUfhyuFnF92"; // Replace with the actual user UID

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ User ${uid} is now an admin`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error setting custom claim:", error);
    process.exit(1);
  });