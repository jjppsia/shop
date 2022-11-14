import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const itemExists = state.cartItems.find((x) => x.id === item.id)

      if (!itemExists) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

      return {
        ...state,
        cartItems: state.cartItems.map((x) => (x.id === item.id ? item : x)),
      }

    default:
      return state
  }
}
