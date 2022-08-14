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
      const amenities = action.selectedOption
      const products = [...state]

      const checked = amenities.map((item) => {
        if (item.checked === true) {
          return item.id
        } else {
          return ''
        }
      })

      const amenityState = products.map((item) => {
        return item.amenities
      })

      console.log(checked)
      console.log(amenityState)

      const updated = amenityState.filter((item) => {
        return item.includes(
          checked.map((item) => {
            return item
          }),
        )
      })

      console.log(updated)

      // const index = products.findIndex((item) => {
      //   return item.id === action.selectedOption
      // })

      // const selectedProduct = products[index]
      // products.map((item) => {

      // })
    }
    default:
      return state
  }
}

export default houseReducer
