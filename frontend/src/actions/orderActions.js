import axios from 'axios'
import {createOrderRequest, createOrderSuccess, createOrderFail, orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, orderPaySuccess, orderPayRequest, orderPayFail, orderListMyRequest, orderListMySuccess, orderListMyFail, orderListRequest, orderListSuccess, orderListFail, orderDeliverRequest, orderDeliverSuccess, orderDeliverFail} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: createOrderRequest,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`api/orders`,order, config);
      dispatch({
        type: createOrderSuccess,
        payload: data,
      });
localStorage.removeItem("cartItems")
      
    } catch (error) {
      dispatch({
        type: createOrderFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getOrder = (id) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: orderDetailsRequest,
      });
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({
        type: orderDetailsSuccess,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: orderDetailsFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: orderPayRequest,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);
      dispatch({
        type: orderPaySuccess,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: orderPayFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: orderDeliverRequest,
      });
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
      };
      
      const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
      dispatch({
        type: orderDeliverSuccess,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: orderDeliverFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listMyOrders = () => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: orderListMyRequest,
      });
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
      dispatch({
        type: orderListMySuccess,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: orderListMyFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listOrders = () => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: orderListRequest,
      });
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders`, config);
      console.log({data})
      dispatch({
        type: orderListSuccess,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: orderListFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };