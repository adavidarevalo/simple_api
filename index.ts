import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ProductsRouter } from "./routes/products.routes";
import { sequelize } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductsRouter);

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log("🚀 ~ file: index.ts:21 ~ app.listen ~ error:", error);
  }
});
