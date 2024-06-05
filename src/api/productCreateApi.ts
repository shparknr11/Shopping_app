import axios from "axios";
import { API_HOST } from "./config";
import { ProductType } from "../types";

export const createProduct = async (newProduct: Omit<ProductType, "id">) => {
  try {
    const response = await axios.post(`${API_HOST}`, newProduct);
    return response;
  } catch (error) {
    console.log(error);
  }
};
