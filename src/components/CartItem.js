import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useContext} from 'react'
import CartContext from '../context/CartContext'
import './CartItem.css' // ✅ CSS file imported

// prettier-ignore
const CartItem = ({cartItemDetails}) => {
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)

  const {dishId, title, brand, quantity, price, imageUrl} = cartItemDetails

  const totalPrice = price * quantity

  return (
    <li className="cart-item-container">
      <img
        className="product-image"
        data-testid="cart-item-image"
        src={imageUrl}
        alt={title}
      />
      <div className="details-container">
        <div className="title-brand-container">
          <p className="product-title" data-testid="cart-item-title">
            {title}
          </p>
          <p className="product-brand">by {brand}</p>
        </div>

        <div className="quantity-container">
          <button
            type="button"
            onClick={() => decrementCartItemQuantity(dishId)}
            className="quantity-button"
            data-testid="decrement"
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="quantity-text">{quantity}</p>
          <button
            type="button"
            onClick={() => incrementCartItemQuantity(dishId)}
            className="quantity-button"
            data-testid="increment"
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>

        <div className="total-remove-container">
          <p className="total-price">Rs {totalPrice.toFixed(2)}/-</p>
          <button
            type="button"
            className="remove-button"
            onClick={() => removeCartItem(dishId)}
          >
            Remove
          </button>
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={() => removeCartItem(dishId)}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
