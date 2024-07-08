import { credential, initializeApp } from "firebase-admin";
import fs from "fs-extra";

export default async () => {
  const serviceAccount: object = JSON.parse(
    await fs.readFile("./src/secret/firebase.json", "utf-8")
  );

  initializeApp({ credential: credential.cert(serviceAccount) });
};
