import React, { useReducer, useContext, createContext } from 'react'
import houseReducer from './HouseReducer'
import { dataProducts } from '../db/data'

const HouseContext = createContext()
const HouseContextDispatcher = createContext()

const HouseProvider = ({ children }) => {
  const [products, dispatch] = useReducer(houseReducer, dataProducts)

  return (
    <HouseContext.Provider value={products}>
      <HouseContextDispatcher.Provider value={dispatch}>{children}</HouseContextDispatcher.Provider>
    </HouseContext.Provider>
  )
}

export default HouseProvider

export const useHouse = () => useContext(HouseContext)
export const useHouseActions = () => useContext(HouseContextDispatcher)
