import {useState} from 'react'
import './index.css'

const ProductItem = props => {
  const {eachProduct} = props
  const {name, price} = eachProduct

  const [count, setCount] = useState(0)
  const onIncrement = () => {
    setCount(prevState => prevState + 1)
  }

  const onDecrement = () => {
    setCount(prevState => prevState - 1)
  }
  return (
    <>
      <div className="product-container">
        <div className="product-item-container">
          <div className="product-icon-container">
            <p className="product-icon-heading">{name[0]}</p>
          </div>
          <div className="product-description-container">
            <h1 className="product-description-heading">{name}</h1>
            <p> price: {price} </p>
          </div>
          <div className="inc-dec-container">
            <button className="button" type="button" onClick={onDecrement}>
              -
            </button>
            <p>{count}</p>
            <button className="button" type="button" onClick={onIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductItem
