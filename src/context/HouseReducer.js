import { dataProducts } from '../db/data'

const houseReducer = (state, action) => {
  switch (action.type) {
    case 'sortPrice': {
      const value = action.selectedOption.value
      if (value === '') {
        return dataProducts
      }
      if (value === 2000) {
        return dataProducts.filter((p) => p.price <= 2000)
      } else if (value === 4000) {
        return dataProducts.filter((p) => p.price <= 4000)
      } else if (value === 5000) {
        return dataProducts.filter((p) => p.price <= 5000)
      } else {
        return dataProducts.filter((p) => p.price <= 6000)
      }
    }
    default:
      return state
  }
}

export default houseReducer
