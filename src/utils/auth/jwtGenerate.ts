import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export const newJwtLogin = async (userId: string, saveProfile: boolean) => {
  try {
    const payload = { userId };

    let token!: string;

    if (saveProfile) {
      token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
    } else {
      token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    return { token };
  } catch (error) {
    console.log(`Generate login token failed! Error: ${error}`.red.bgBlack);

    return { token: null, message: "Generate login token failed!" };
  }
};
