import {useEffect, useState} from 'react'
import './MenuPage.css'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

function DishList({dishes, dishCounts, setDishCounts}) {
  const inc = id =>
    setDishCounts(prev => ({...prev, [id]: (prev[id] || 0) + 1}))
  const dec = id =>
    setDishCounts(prev => ({...prev, [id]: Math.max((prev[id] || 0) - 1, 0)}))

  return (
    <div className="dishes-container">
      {dishes.map(dish => {
        /* eslint-disable camelcase */
       // camelcase senesitive
        const {
          dish_id,
          dish_name,
          dish_image,
          dish_currency,
          dish_price,
          dish_description,
          dish_calories,
          dish_Availability,
          addonCat,
          dish_Type,
        } = dish
        const count = dishCounts[dish_id] || 0

        return (
          <div className="dish-container" key={dish_id}>
            <img
              className="veg-icon"
              src={
                dish_Type === 2
                  ? 'https://img.icons8.com/color/48/vegetarian-food-symbol.png'
                  : 'https://img.icons8.com/color/48/non-vegetarian-food-symbol.png'
              }
              alt={dish_Type === 2 ? 'Vegetarian' : 'Non-Vegetarian'}
            />

            <div className="dish-details">
              <h1 className="dish-name">{dish_name}</h1>
              <img
                className="dish-image-mobile d-block d-sm-none"
                src={dish_image}
                alt={dish_name}
              />
              <p className="dish-price">
                {dish_currency} {dish_price}
              </p>
              <p className="dish-description">{dish_description}</p>
              {dish_Availability ? (
                <div className="add-btn-wrapper">
                  <button type="button" onClick={() => dec(dish_id)}>
                    -
                  </button>
                  <p className="count-text">{count}</p>
                  <button type="button" onClick={() => inc(dish_id)}>
                    +
                  </button>
                </div>
              ) : (
                <p className="not-avail-text">Not available</p>
              )}
              {addonCat?.length > 0 && (
                <p style={{color: 'blue'}}>Customizations available</p>
              )}
            </div>

            <p className="calories-text">{dish_calories} calories</p>
            <img
              className="dish-image d-none d-lg-block"
              src={dish_image}
              alt={dish_name}
            />
          </div>
        )
      })}
    </div>
  )
}

function MenuPage() {
  const [menuData, setMenuData] = useState([])
  const [restaurantName, setRestaurantName] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [dishCounts, setDishCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(dishesApiUrl)
      const json = await response.json()
      const restaurant = json[0]
      setRestaurantName(restaurant.restaurant_name)
      setMenuData(restaurant.table_menu_list)
      setActiveCategory(restaurant.table_menu_list[0].menu_category)
      setLoading(false)
    }
    getData()
  }, [])

  const activeObj = menuData.find(cat => cat.menu_category === activeCategory)
  const cartCount = Object.values(dishCounts).reduce((s, n) => s + n, 0)

  return (
    <div className="parent-container">
      {/* Single universal responsive header */}
      <nav className="header-nav">
        <h1>{restaurantName}</h1>
        <div className="orders-icon-container">
          <p>My Orders</p>
          <p className="cart-count">{cartCount}</p>
        </div>
      </nav>

      {/* Category tabs */}
      <div className="button-container">
        {menuData.map(cat => (
          <button
            key={cat.menu_category_id}
            type="button"
            className={`menu-button ${
              activeCategory === cat.menu_category ? 'active' : ''
            }`}
            onClick={() => setActiveCategory(cat.menu_category)}
          >
            {cat.menu_category}
          </button>
        ))}
      </div>

      {/* Dish list */}
      {!loading && activeObj && (
        <DishList
          dishes={activeObj.category_dishes}
          dishCounts={dishCounts}
          setDishCounts={setDishCounts}
        />
      )}
    </div>
  )
}

export default MenuPage
