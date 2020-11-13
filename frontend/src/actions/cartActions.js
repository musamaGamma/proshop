import { cartAddItem, cartRemoveItem, cartSaveShippingAddress, cartSavePaymentMethod } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + id);
    dispatch({
      type: cartAddItem,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: cartRemoveItem,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {

  dispatch({
    type: cartSaveShippingAddress,
    payload: data
  })

  localStorage.setItem("shippingAddress", JSON.stringify(data))

}

export const savePaymentMethod = (data) => (dispatch) => {

  dispatch({
    type: cartSavePaymentMethod,
    payload: data
  })

  localStorage.setItem("paymentMethod", JSON.stringify(data))

}
