import axios from "axios";

export const fetchProducts = () => {
  return async function (dispatch, getState) {
    const response = await axios.get("https://fakestoreapi.com/products");
    const results = response.data;

    dispatch({
      type: "FETCH_PRODUCT_LIST",
      payload: results,
    });
  };
};
