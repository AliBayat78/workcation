import { dataProducts } from '../db/data'

const houseReducer = (state, action) => {
  switch (action.type) {
    case 'sortPrice': {
      const value = action.selectedOption.value
      if (value === '') {
        return dataProducts
      } else if (value === 2000) {
        return dataProducts.filter((p) => p.price <= 2000)
      } else if (value === 4000) {
        return dataProducts.filter((p) => p.price <= 4000)
      } else if (value === 5000) {
        return dataProducts.filter((p) => p.price <= 5000)
      } else {
        return dataProducts.filter((p) => p.price <= 6000)
      }
    }
    case 'sortProperty': {
      const value = action.selectedOption
      const products = [...state]
      if (value === '') {
        return dataProducts
      } else if (value === 'House') {
        return products.filter((p) => p.type === 'House')
      } else if (value === 'Apartment') {
        return products.filter((p) => p.type === 'Apartment')
      } else if (value === 'Loft') {
        return products.filter((p) => p.type === 'Loft')
      } else {
        return products.filter((p) => p.type === 'Townhouse')
      }
    }
    case 'sortAmenity': {
      const amenities = action.selectedOption.split(' ')
      const products = [...state]

      let newAmenities = new Set(amenities)
      if (newAmenities.length === 1 && newAmenities.includes('')) {
        return dataProducts
      } else {
        return products.filter((p) => {
          return amenities.every((element) => p.amenities.indexOf(element) > -1)
        })
      }
    }
    default:
      return state
  }
}

export default houseReducer
