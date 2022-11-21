import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const ProductItem = props => {
  const {productData} = props
  const {name, price, id} = productData
  const [count, setCount] = useState(0)
  // const [cart, setCart] = useState([])
  const onIncrement = () => {
    setCount(prevState => prevState + 1)
  }

  const onDecrement = () => {
    setCount(prevState => prevState - 1)
  }

  return (
    <>
      <CartContext.Consumer>
        {value => {
          const {addCartItem, removeCartItem} = value
          const onClickAddToCart = () => {
            addCartItem({...productData, count})
          }
          const onRemoveCartItem = () => {
            removeCartItem(id)
            setCount(0)
          }
          return (
            <li className="product-container">
              <div className="product-item-container">
                <div className="product-icon-container">
                  <p className="product-icon-heading">{name[0]}</p>
                </div>
                <div className="product-description-container">
                  <h1 className="product-description-heading">{name}</h1>
                  <p> price: {price}</p>
                  <div className="add-remove">
                    <button
                      className="add"
                      onClick={onClickAddToCart}
                      type="button"
                    >
                      add
                    </button>

                    <button
                      className="remove"
                      onClick={onRemoveCartItem}
                      type="button"
                    >
                      remove
                    </button>
                  </div>
                </div>

                <div className="inc-dec-container">
                  <button
                    className="button"
                    type="button"
                    onClick={onDecrement}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    className="button"
                    type="button"
                    onClick={onIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    </>
  )
}

export default ProductItem
