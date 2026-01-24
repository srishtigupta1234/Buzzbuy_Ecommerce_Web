import {
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_SUCCESS,
} from "./ActionType.js";

import { api } from "../../config/apiConfig.js";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_REQUEST });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const params = {
      minPrice,
      maxPrice,
      category,
      sort,
      pageNumber,
      pageSize,
    };

    // ✅ only add if value exists
    if (colors?.length) params.color = colors.join(",");
    if (sizes?.length) params.size = sizes.join(",");
    if (minDiscount != null) params.minDiscount = minDiscount;
    if (stock != null) params.stock = stock;

    const { data } = await api.get("/api/products", { params });
    dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FIND_PRODUCT_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const findProductsById = (reqData) => async(dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  try {
    const { data } = await api.get(
      `/api/products/id/${reqData.productId}`
    );
    
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};
