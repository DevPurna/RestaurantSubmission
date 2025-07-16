// MenuPage.js
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import CartContext from '../context/CartContext'
import './MenuPage.css' // ✅ Converted from styled-components

const DishList = ({dishes, dishCounts, setDishCounts}) => {
  const {addCartItem, cartList} = useContext(CartContext)

  const handleIncrement = dishId => {
    setDishCounts(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const handleDecrement = dishId => {
    setDishCounts(prev => ({
      ...prev,
      [dishId]: Math.max((prev[dishId] || 0) - 1, 0),
    }))
  }

  const handleAddToCart = dish => {
    const isAlreadyInCart = cartList.find(item => item.dishId === dish.dish_id)
    if (!isAlreadyInCart) {
      const quantity = dishCounts[dish.dish_id] || 1
      addCartItem({
        dishId: dish.dish_id,
        title: dish.dish_name,
        brand: dish.dish_currency,
        quantity,
        price: dish.dish_price,
        imageUrl: dish.dish_image,
      })
    }
  }

  return (
    <div className="dishes-container">
      {dishes.map(dish => {
        const dishQty = dishCounts[dish.dish_id] || 0
        const alreadyInCart = cartList.some(
          item => item.dish_id === dish.dish_id,
        )

        return (
          <div className="dish-container" key={dish.dish_id}>
            <img
              className="veg-nonveg-img"
              src={
                dish.dish_Type === 2
                  ? 'https://img.icons8.com/color/48/vegetarian-food-symbol.png'
                  : 'https://img.icons8.com/color/48/non-vegetarian-food-symbol.png'
              }
              alt={dish.dish_Type === 2 ? 'Vegetarian' : 'Non-Vegetarian'}
            />
            <div className="dish-details">
              <h3 className="dish-name" data-testid="dish-name">
                {dish.dish_name}
              </h3>
              <p className="dish-price" data-testid="dish-price">
                {dish.dish_currency} {dish.dish_price}
              </p>
              <p className="dish-description" data-testid="dish-description">
                {dish.dish_description}
              </p>
              {dish.dish_Availability ? (
                <>
                  <div className="add-button-container">
                    <button
                      type="button"
                      data-testid="decrement"
                      onClick={() => handleDecrement(dish.dish_id)}
                    >
                      -
                    </button>
                    <span className="count-text" data-testid="dish-qty">
                      {dishQty}
                    </span>
                    <button
                      type="button"
                      data-testid="increment"
                      onClick={() => handleIncrement(dish.dish_id)}
                    >
                      +
                    </button>
                  </div>

                  {dishQty > 0 && !alreadyInCart && (
                    <button
                      type="button"
                      data-testid="add-to-cart"
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(dish)}
                    >
                      ADD TO CART
                    </button>
                  )}

                  {alreadyInCart && (
                    <p className="added-to-cart">Added to Cart</p>
                  )}
                </>
              ) : (
                <p className="not-available" data-testid="not-available">
                  Not Available
                </p>
              )}

              {dish.addonCat?.length > 0 && (
                <p
                  className="customization-text"
                  data-testid="customization-available"
                >
                  Customizations Available
                </p>
              )}
            </div>
            <span className="calories-text" data-testid="dish-calories">
              {dish.dish_calories} calories
            </span>
            <img
              className="dish-image"
              data-testid="dish-image"
              src={dish.dish_image}
              alt={dish.dish_name}
            />
          </div>
        )
      })}
    </div>
  )
}

const MenuPage = () => {
  const [activeButton, setActiveButton] = useState('Salads and Soup')
  const [menuData, setMenuData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dishCounts, setDishCounts] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        const tableMenu = response.data[0]?.table_menu_list || []
        setMenuData(tableMenu)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching menu data:', error)
      }
    }

    fetchData()
  }, [])

  const activeCategoryData = menuData.find(
    item => item.menu_category === activeButton,
  )

  const ActiveComponent = DishList

  const menuItems = menuData.map(item => item.menu_category)

  const {cartList} = useContext(CartContext)
  const history = useHistory()

  const totalItems = cartList.length

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="menu-parent-container">
      <Header totalItems={totalItems} handleLogout={handleLogout} />
      <div className="menu-text-container">
        <ul className="menu-button-container">
          {menuItems.map(item => (
            <li
              key={item}
              className={`menu-button ${activeButton === item ? 'active' : ''}`}
              onClick={() => setActiveButton(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        {loading && <p>Loading menu...</p>}

        {!loading && ActiveComponent && activeCategoryData && (
          <ActiveComponent
            dishes={activeCategoryData.category_dishes}
            dishCounts={dishCounts}
            setDishCounts={setDishCounts}
          />
        )}
      </div>
    </div>
  )
}

export default MenuPage
