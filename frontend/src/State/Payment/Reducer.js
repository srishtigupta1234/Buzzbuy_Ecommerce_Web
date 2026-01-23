import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  payment: null,
  error: null,
  success: false,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
        success: true,
      };

    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

   
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
        success: true,
      };

    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
