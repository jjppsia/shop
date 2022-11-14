import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const itemExist = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      )

      if (!itemExist) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product === itemExist.product ? item : cartItem
        ),
      }
    default:
      return state
  }
}
