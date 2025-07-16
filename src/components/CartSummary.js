import {useContext, useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../context/CartContext'
import './CartSummary.css' // ✅ Import external CSS

const CartSummary = () => {
  const [paymentOption, setPaymentOption] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const total = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const showSuccessText = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
      removeAllCartItems()
    }, 3000)
  }

  return (
    <div className="summary-container">
      <h1 className="order-total-value">
        <span className="order-total-label">Order Total:</span> Rs {total}/-
      </h1>
      <p className="total-items-text">{cartList.length} Items in cart</p>

      <Popup
        modal
        overlayStyle={{background: 'rgba(0, 0, 0, 0.6)', zIndex: 999}}
        trigger={
          <button type="button" className="checkout-button">
            Checkout
          </button>
        }
      >
        {close => (
          <div className="popup-content">
            <button
              type="button"
              className="popup-close-button"
              onClick={close}
            >
              &times;
            </button>
            <h2 className="popup-heading">Choose Payment Method</h2>

            <form className="payment-form">
              <label className="payment-label">
                <input disabled type="radio" name="payment" /> Card
              </label>
              <label className="payment-label">
                <input disabled type="radio" name="payment" /> Net Banking
              </label>
              <label className="payment-label">
                <input disabled type="radio" name="payment" /> UPI
              </label>
              <label className="payment-label">
                <input disabled type="radio" name="payment" /> Wallet
              </label>
              <label className="payment-label">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  onChange={e => setPaymentOption(e.target.value)}
                  checked={paymentOption === 'cod'}
                />{' '}
                Cash on Delivery
              </label>
            </form>

            <p className="summary-text">Items: {cartList.length}</p>
            <p className="summary-text">Total: Rs {total.toFixed(2)}/-</p>

            <button
              type="button"
              className="confirm-button"
              disabled={paymentOption !== 'cod'}
              onClick={showSuccessText}
            >
              Confirm Order
            </button>

            {orderPlaced && (
              <p className="success-message">
                Your order has been placed successfully
              </p>
            )}
          </div>
        )}
      </Popup>
    </div>
  )
}

export default CartSummary
