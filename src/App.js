import {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import MenuPage from './pages/MenuPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = item => {
    const existingItem = cartList.find(i => i.dishId === item.dishId)
    if (existingItem) {
      setCartList(prev =>
        prev.map(i =>
          i.dishId === item.dishId
            ? {...i, quantity: i.quantity + item.quantity}
            : i,
        ),
      )
    } else {
      setCartList(prev => [...prev, item])
    }
  }

  const removeCartItem = id => {
    setCartList(prev => prev.filter(item => item.dishId !== id))
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(item =>
        item.dishId === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev
        .map(item =>
          item.dishId === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeAllCartItems = () => setCartList([])

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={MenuPage} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="*" component={() => <h1>404 Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
