import { Request, Response } from "express";
import Product from "../models/products.models";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await await Product.findAll({ where: { active: true } });

  return res.status(200).json({ products });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ msg: "Id is required" });

  const product = await await Product.findOne({ where: { id, active: true } });

  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  return res.status(200).json({ product });
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;

  try {
    const product = await Product.create({ name, price, stock });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${name} is not created`,
      error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  const { id } = req.params;

  if (!id) return res.status(400).json({ msg: "Id is required" });

  try {
    const product = await Product.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id,
          active: true,
        },
      }
    );
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${name} is not found`,
      error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ msg: "Id is required" });

  try {
    const product = await Product.update(
      {
        active: false,
      },
      {
        where: {
          id,
          active: true,
        },
      }
    );
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${id} is not found`,
      error,
    });
  }
};
