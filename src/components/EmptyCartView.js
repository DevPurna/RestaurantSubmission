import {Link} from 'react-router-dom'
import './EmptyCartView.css' // ✅ Import external CSS

const EmptyCartView = () => (
  <div className="empty-view-container">
    <img
      className="empty-cart-image"
      data-testid="empty-cart-image"
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="cart empty"
    />
    <h1 className="empty-cart-heading">Your Cart Is Empty</h1>
    <Link to="/">
      <button type="button" className="shop-now-button">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
