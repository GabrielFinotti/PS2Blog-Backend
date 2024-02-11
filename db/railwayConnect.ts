import mongoose from "mongoose";

export const railwayDb = async function () {
  const mongoDB = process.env.MONGO_PRIVATE_URL;

  if (!mongoDB) {
    throw new Error("Nenhuma variável de ambiente encontrada!");
  }

  try {
    await mongoose.connect(`${mongoDB}`);
    console.log("Banco conectado!");
  } catch (err) {
    throw err;
  }
};
