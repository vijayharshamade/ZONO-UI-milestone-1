import {useState} from 'react'
import Home from './components/Home'
import CartContext from './context/CartContext'

const App = () => {
  const [cartList, setCartList] = useState([])

  const removeCartItem = id => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    setCartList(updatedCartList)
  }

  const addCartItem = product => {
    setCartList(prevState => [...prevState, product])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeCartItem,
        addCartItem,
      }}
    >
      <Home />
    </CartContext.Provider>
  )
}

export default App
