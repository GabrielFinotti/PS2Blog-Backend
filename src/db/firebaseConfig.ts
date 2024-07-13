import admin from "firebase-admin";
import fs from "fs-extra";

export default async () => {
  try {
    const serviceAccount = await fs.readJSON("./src/secret/firebase.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "ps2-blog-cloud.appspot.com",
    });

    console.log("Firebase instance started ✅".cyan.bgBlack);
  } catch (error) {
    console.log(`Error starting firebase: ${error}`);
  }
};
