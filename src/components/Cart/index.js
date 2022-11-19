import {useState, useEffect} from 'react'
import BrandItem from '../BrandItem'
import ProductItem from '../ProductItem'
import './index.css'

const Cart = () => {
  const [apiData, setApiData] = useState([])
  const [toggle, setToggle] = useState(true)
  const defaultBrand = toggle ? 'Samsung' : 'Sony'
  const onClickToggle = () => {
    setToggle(prevState => !prevState)
  }

  const url =
    'https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw/75bf5e59e47748fad0d01ca63c81dd3791c2615c/product.json'
  const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    setApiData(data)
  }
  // console.log(apiData)

  useEffect(() => {
    getProducts()
  }, [])

  const samsungArray = []
  const sonyArray = []

  apiData.forEach(eachItem => {
    if (eachItem.brand === 'Samsung') {
      samsungArray.push(eachItem)
    }

    if (eachItem.brand === 'Sony') {
      sonyArray.push(eachItem)
    }
  })

  // console.log(samsungArray)
  // console.log(sonyArray)

  const brands = [
    {id: 'Samsung', brand: samsungArray},
    {id: 'Sony', brand: sonyArray},
  ]

  const filteredData = apiData.filter(each => each.brand === defaultBrand)
  // console.log(filteredData)

  const onCheckout = event => {
    event.preventDefault()
  }
  return (
    <>
      <div className="ui-container">
        <div className="brand-container">
          <div className="brand-heading-container">
            <h1 className="heading">Brands</h1>
          </div>
          <div className="brand-item-container">
            <ul className="list">
              {brands.map(each => (
                <li onClick={onClickToggle}>
                  <BrandItem key={each.id} apiData={each} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-container">
          <div className="heading-container">
            <div className="product-heading-container">
              <h1 className="heading">Products of {defaultBrand}</h1>
            </div>
            <div className="brand-item-container">
              <ul className="product-list">
                {filteredData.map(each => (
                  <ProductItem key={each.id} eachProduct={each} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="cart-container">
          <div className="heading-container">
            <div className="cart-heading-container">
              <h1 className="heading">Cart</h1>
            </div>
            <div className="cart-item-container">
              <h1 className="product-name">Product Name</h1>
              <p className="product-qty">Qty: total:</p>
            </div>
          </div>
          <div className="checkout-item-container">
            <h1 className="check-no-of-items">Total no of Items: </h1>
            <p className="checkout-total">
              Grand Total:
              <form className="form-container" onSubmit={onCheckout}>
                <input type="text" className="input" placeholder="Name" />
                <input type="text" className="input" placeholder="Email" />
                <input type="number" className="input" placeholder="Mobile" />
                <button type="submit">Check out</button>
              </form>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
