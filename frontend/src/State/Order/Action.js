import { api } from "../../config/apiConfig.js";
import { GET_ORDER_BY_ID_REQUEST, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_SUCCESS  } from "./ActionType";


export const createOrder = (reqData)=>async(dispatch)=>{
     dispatch({type:CREATE_ORDER_REQUEST});
    
    try{
        const {data} = await api.post(`/api/orders/`,reqData.address)
        if(data.id){
            reqData.navigate({search:`step=3&order_id=${data.id}`})
        }
        console.log("data",data);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
        
    }catch(err){
       dispatch({type:CREATE_ORDER_FAILURE,payload:err.message})
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("order by id", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
  }
};
