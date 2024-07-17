import axios from "axios";
import dotenv from "dotenv";
import { GameByMobygames } from "../../../interfaces/gameByMobygames";

dotenv.config({ path: "./src/env/.env" });

export const mobyApi = async (offset: number) => {
  try {
    const apiUrl = "https://api.mobygames.com/v1/games";

    const response = await axios.get(
      `${apiUrl}?offset=${offset}&api_key=${process.env.MOBY_API_KEY}`
    );

    return response.data.games as GameByMobygames[];
  } catch (error) {
    throw error;
  }
};
