import axios from "axios";
import { API_HOST } from "./config";

export const getProductList = async () => {
  try {
    const response = await axios.get(`${API_HOST}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
