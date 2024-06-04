import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export const newJwtRegister = async (userId: string) => {
  try {
    const payload = { userId };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    console.log(`Generate register token failed! Error: ${error}`.red.bgBlack);

    return { token: null, message: "Generate register token failed!" };
  }
};

export const newJwtLogin = async (userId: string) => {
  try {
    const payload = { userId };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return { token };
  } catch (error) {
    console.log(`Generate login token failed! Error: ${error}`.red.bgBlack);

    return { token: null, message: "Generate login token failed!" };
  }
};
