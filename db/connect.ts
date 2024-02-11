import mongoose from "mongoose";

export const connect = mongoose
  .connect("mongodb://localhost:27017/PS2-Blog")
  .then(() => {
    console.log("Conectado ao banco!");
  })
  .catch(() => {
    console.log("Não foi possível se conectar ao banco!");
  });
