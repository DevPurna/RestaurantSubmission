// MenuPage.js
import {useState, useEffect} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'

import {
  ParentContainer,
  Navtext,
  TextContainer,
  DesktopNav,
  OrdersIconContainer,
  OrderText,
  MobileNav,
  ButonContainer,
  MenuButton,
  DishesContainer,
  DishContainer,
  VegNvegImg,
  DishDetailsContainer,
  DishName,
  DishPrice,
  DishDescription,
  AddButtonContainer,
  NotAvailText,
  CountText,
  DishImage,
  CaloriesText,
} from './styledComponents'

const DishList = ({dishes, dishCounts, setDishCounts}) => {
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

  return (
    <DishesContainer>
      {dishes.map(dish => (
        <DishContainer key={dish.dish_id} style={{marginBottom: '16px'}}>
          <VegNvegImg
            src={
              dish.dish_Type === 2
                ? 'https://img.icons8.com/color/48/vegetarian-food-symbol.png'
                : 'https://img.icons8.com/color/48/non-vegetarian-food-symbol.png'
            }
            alt={dish.dish_Type === 2 ? 'Vegetarian' : 'Non-Vegetarian'}
          />
          <DishDetailsContainer>
            <DishName>{dish.dish_name}</DishName>
            <DishPrice>
              {dish.dish_currency} {dish.dish_price}
            </DishPrice>
            <DishDescription>{dish.dish_description}</DishDescription>

            {/* add / remove */}
            {dish.dish_Availability ? (
              <AddButtonContainer>
                <button
                  type="button"
                  onClick={() => handleDecrement(dish.dish_id)}
                >
                  -
                </button>
                <CountText>{dishCounts[dish.dish_id] || 0}</CountText>
                <button
                  type="button"
                  onClick={() => handleIncrement(dish.dish_id)}
                >
                  +
                </button>
              </AddButtonContainer>
            ) : (
              <NotAvailText>Not Available</NotAvailText>
            )}

            {dish.addonCat?.length > 0 && (
              <p style={{color: 'blue', cursor: 'pointer'}}>
                Customizations Available
              </p>
            )}
          </DishDetailsContainer>

          <CaloriesText>{dish.dish_calories} calories</CaloriesText>

          <DishImage
            src={dish.dish_image}
            alt={dish.dish_name}
            style={{width: '100px', borderRadius: '8px'}}
          />
        </DishContainer>
      ))}
    </DishesContainer>
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

  const menuItems = menuData.map(item => item.menu_category) // ensure it has a matching component

  const totalItems = Object.values(dishCounts).reduce(
    (sum, count) => sum + count,
    0,
  )

  return (
    <ParentContainer>
      {/* Desktop Navbar */}
      <DesktopNav>
        <Navtext>UNI Resto Cafe</Navtext>
        <OrdersIconContainer>
          <OrderText>My Orders ({totalItems})</OrderText>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{color: 'black', fontSize: '1.5rem'}}
          />
        </OrdersIconContainer>
      </DesktopNav>

      {/* Mobile Navbar */}
      <MobileNav>
        <Navtext>UNI Resto Cafe</Navtext>
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{color: 'black', fontSize: '1.2rem'}}
          />
          {totalItems > 0 && (
            <span
              style={{color: 'red', fontSize: '0.85rem', fontWeight: '500'}}
            >
              ({totalItems})
            </span>
          )}
        </div>
      </MobileNav>

      <TextContainer>
        <ButonContainer>
          {menuItems.map(item => (
            <MenuButton
              key={item}
              isActive={activeButton === item}
              onClick={() => setActiveButton(item)}
            >
              {item}
            </MenuButton>
          ))}
        </ButonContainer>

        {loading && <p>Loading menu...</p>}

        {!loading && ActiveComponent && activeCategoryData && (
          <ActiveComponent
            dishes={activeCategoryData.category_dishes}
            dishCounts={dishCounts}
            setDishCounts={setDishCounts}
          />
        )}
      </TextContainer>
    </ParentContainer>
  )
}

export default MenuPage
