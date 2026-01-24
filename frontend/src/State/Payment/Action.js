import { api } from "../../config/apiConfig.js";
import {  CREATE_PAYMENT_REQUEST,CREATE_PAYMENT_SUCCESS,CREATE_PAYMENT_FAILURE,UPDATE_PAYMENT_REQUEST,UPDATE_PAYMENT_SUCCESS,UPDATE_PAYMENT_FAILURE } from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    const { data } = await api.post(`/api/payments/${orderId}`);

   
    if (data?.payment_link_url) {
      window.location.assign(data.payment_link_url); // more reliable
    } else {
      throw new Error("Payment link not received");
    }

    dispatch({
      type: CREATE_PAYMENT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    console.error("Payment error:", error);
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });

  try {
    const { data } = await api.get(
      `/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,
    
    );

    dispatch({
      type: UPDATE_PAYMENT_SUCCESS,
      payload: data,
    });


  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
