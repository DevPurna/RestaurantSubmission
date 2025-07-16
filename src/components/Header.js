import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom'
import './Header.css' // ✅ Import external CSS

const Header = ({totalItems, handleLogout}) => {
  const history = useHistory()

  const handleCart = () => {
    history.push('/cart')
  }

  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="desktop-nav">
        <button
          type="button"
          className="transparent-button"
          onClick={() => history.push('/')}
        >
          <h1 className="nav-text" data-testid="restaurant-name">
            UNI Resto Cafe
          </h1>
        </button>

        <div className="right-container">
          <div className="orders-icon-container">
            <p className="order-text" data-testid="order-text">
              My Orders ({totalItems})
            </p>
            <button
              onClick={handleCart}
              type="button"
              className="transparent-button"
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{color: 'black', fontSize: '1.5rem'}}
              />
            </button>
          </div>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="mobile-nav">
        <h1 className="nav-text">UNI Resto Cafe</h1>
        <button
          type="button"
          onClick={handleCart}
          className="mobile-cart-button"
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{color: 'black', fontSize: '1.2rem'}}
          />
          {totalItems >= 0 && (
            <span
              data-testid="cart-count"
              style={{color: 'red', fontSize: '0.85rem', fontWeight: '500'}}
            >
              ({totalItems})
            </span>
          )}
        </button>
      </nav>
    </div>
  )
}

export default Header
