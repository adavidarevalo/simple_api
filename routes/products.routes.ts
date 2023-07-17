import { Router } from "express";
import { deleteProduct, getProduct } from "../controllers/products.controller";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products.controller";

const router = new Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as ProductsRouter };
