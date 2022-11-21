const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2)
}

export const calculatePrices = (cart) => {
  let { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart

  itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
  taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
  totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))

  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}

export const calculateOrderPrices = (order) => {
  let { itemsPrice } = order

  itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

  return { itemsPrice }
}
