import { cartAddItem, cartRemoveItem, cartSaveShippingAddress, cartSavePaymentMethod } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case cartAddItem:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
      case cartRemoveItem:
          return {
              ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)
          }
          case cartSaveShippingAddress:
            return {
              ...state, shippingAddress: action.payload
            }
          case cartSavePaymentMethod:
            return {
              ...state, paymentMethod: action.payload
            }
    default:
      return state;
  }
};
