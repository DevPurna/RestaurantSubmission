// MenuPage.styles.js
import styled from 'styled-components'

export const ParentContainer = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
`

export const DesktopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  border-radius: 0 0 8px 8px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const MobileNav = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    padding: 10px 15px;
    border-radius: 0 0 8px 8px;
  }
`

export const Navtext = styled.h1`
  font-size: 1.5rem;
`

export const OrderText = styled.p`
  font-size: 1.2rem;
`

export const OrdersIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const TextContainer = styled.div`
  padding: 20px;
`

export const ButonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px 0;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none;
  }

  scroll-behavior: smooth;

  @media (max-width: 575px) {
    gap: 16px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    gap: 16px;
  }

  @media (min-width: 768px) {
    overflow-x: visible;
    flex-wrap: wrap;
  }
`

export const MenuButton = styled.div`
  cursor: pointer;
  font-size: 1rem;
  display: inline-block;
  padding-bottom: 6px;
  border-bottom: 2px solid transparent;
  flex: 0 0 auto;
  color: ${({isActive}) => (isActive ? 'red' : 'black')};
  border-bottom: ${({isActive}) =>
    isActive ? '2px solid red' : '2px solid transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: red;
    border-bottom: 2px solid red;
  }

  @media (min-width: 991px) {
    font-size: 1.1rem;
  }
`

export const DishesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media (max-width: 575px) {
    padding: 0px;
    gap: 10px;
  }
`

export const NotAvailText = styled.p`
  color: red;
`

export const DishContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 575px) {
    padding: 6px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const VegNvegImg = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 8px;

  @media (max-width: 575px) {
    margin-right: 0px;
  }
`

export const DishDetailsContainer = styled.div`
  flex: 1;
  margin: 0 16px;

  @media (max-width: 575px) {
    margin-right: 4px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin: 12px 0;
  }
`

export const DishName = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 6px 0;
  color: #222;

  @media (max-width: 575px) {
    font-size: 0.9rem;
    font-weight: bold;
    margin: 0 0 2px 0;
  }
`

export const DishPrice = styled.p`
  font-size: 1rem;
  margin: 0 0 6px 0;
  font-weight: 500;
  color: #444;

  @media (max-width: 575px) {
    font-size: 0.7rem;
    font-weight: bold;
  }
`

export const DishDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 10px 0;

  @media (max-width: 575px) {
    font-size: 0.8rem;
  }
`

export const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 12px 0;
  background-color: #00c853;
  width: 80px;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 6px;

  button {
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    background-color: transparent;
    border: none;

    @media (max-width: 575px) {
      padding: 4px 6px;
      font-size: 0.8rem;
    }

    &:hover {
      background-color: #00b44b;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  @media (max-width: 575px) {
    gap: 0px;
    margin: 6px 0;
  }
`

export const CountText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`

export const DishImage = styled.img`
  width: 120px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 575px) {
    max-width: 20%;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    width: 100%;
    max-width: 200px;
    margin-top: 12px;
  }
`

export const CaloriesText = styled.span`
  align-self: center;
  margin-right: 10%;
  color: #ffa709;

  @media (max-width: 575px) {
    margin-right: 4px;
    font-size: 0.8rem;
  }
`
