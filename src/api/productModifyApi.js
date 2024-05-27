import axios from "axios";
import { API_HOST } from "./config";

export const getProductOne = async id => {
  try {
    const response = await axios.get(`${API_HOST}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const modifyProduct = async updateProduct => {
  try {
    const response = await axios.patch(
      `${API_HOST}/${updateProduct.id}`,
      updateProduct,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async id => {
  try {
    const response = await axios.delete(`${API_HOST}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
