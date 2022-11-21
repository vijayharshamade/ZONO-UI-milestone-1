const Cart = props => {
  const {eachCartItem} = props
  const {name, count, price} = eachCartItem
  const total = count * price
  return (
    <li className="cart-item-container">
      <h1 className="product-name">{name}</h1>
      <p className="product-qty">
        Qty: {count} Total: {total}
      </p>
    </li>
  )
}
export default Cart
