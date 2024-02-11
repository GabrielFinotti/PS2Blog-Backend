import mongoose from "mongoose";

export const connect = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/PS2-Blog")
    .then(() => {
      console.log("Conectado ao banco de dados!");
    })
    .catch((err) => {
      console.error(`Erro ao se conectar ao banco de dado: ${err}`);
    });
};
