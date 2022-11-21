import {useState, useEffect} from 'react'
import BrandItem from '../BrandItem'
import ProductItem from '../ProductItem'
import Cart from '../Cart'
import CartContext from '../../context/CartContext'
import './index.css'

const Home = () => {
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

    setApiData(data)
  }

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

  const brands = [
    {id: 'Samsung', brand: samsungArray},
    {id: 'Sony', brand: sonyArray},
  ]

  const filteredData = apiData.filter(each => each.brand === defaultBrand)
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
            <ul className="list" onClick={onClickToggle}>
              {brands.map(each => (
                <BrandItem key={each.id} apiData={each} />
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
                  <ProductItem key={each.id} productData={each} />
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

            <CartContext.Consumer>
              {value => {
                const {cartList} = value

                let total = 0
                cartList.forEach(eachCartItem => {
                  total += eachCartItem.price * eachCartItem.count
                })

                const orderDetails = {
                  totalNoOfItems: cartList.length,
                  grandTotal: total,
                }

                const jsonData = JSON.stringify(orderDetails)
                if (cartList.length !== 0) {
                  console.log(jsonData)
                }

                return (
                  <>
                    <ul>
                      {cartList.map(each => (
                        <Cart key={each.id} eachCartItem={each} />
                      ))}
                    </ul>
                    <div className="checkout-item-container">
                      <h1 className="check-no-of-items">
                        Total no of Items:{cartList.length}
                      </h1>
                      <p className="checkout-total">Grand Total: {total}</p>
                      <form className="form-container" onSubmit={onCheckout}>
                        <input
                          type="text"
                          className="input"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          className="input"
                          placeholder="Email"
                        />
                        <input
                          type="number"
                          className="input"
                          placeholder="Mobile"
                        />
                        <button type="submit">Check out</button>
                      </form>
                    </div>
                  </>
                )
              }}
            </CartContext.Consumer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
