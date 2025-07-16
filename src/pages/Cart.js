import {useContext} from 'react'
import CartContext from '../context/CartContext'
import Header from '../components/Header'
import EmptyCartView from '../components/EmptyCartView'
import CartSummary from '../components/CartSummary'
import CartItem from '../components/CartItem'
import './Cart.css' // ✅ Import CSS

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const showEmptyView = cartList.length === 0

  return (
    <>
      <Header totalItems={cartList.length} />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-button"
              data-testid="remove-all"
            >
              Remove All
            </button>
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <CartItem
                  key={eachCartItem.dishId}
                  cartItemDetails={eachCartItem}
                />
              ))}
            </ul>
            <CartSummary />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
