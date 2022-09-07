import './sidebar.css'
import { MdHouseboat } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { GiPalmTree } from 'react-icons/gi'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useHouseActions } from '../../context/HouseProvider'
import Navbar from '../Navbar/Navbar'

// Bed and Bath options
const options = [
  { value: '', label: 'All' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
]

const priceOptions = [
  { value: '', label: 'All' },
  { value: 2000, label: 'Up to $2.000 /wk' },
  { value: 4000, label: 'Up to $4.000 /wk' },
  { value: 5000, label: 'Up to $5.000 /wk' },
  { value: 6000, label: 'Up to $6.000 /wk' },
]

// Styles for Select Component
const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (base) => ({
    ...base,
    fontFamily: 'Times New Roman',
  }),
  control: (base, state) => ({
    ...base,
    background: '#4A5568',
    // Over writes the different states of border
    borderColor: state.isFocused ? '#667EEA' : '#a0aec0',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Over writes the different states of border
      borderColor: state.isFocused ? 'cyan' : '#667EEA',
    },
    fontFamily: 'Graphik',
  }),
  input: (provided) => ({
    ...provided,
    color: '#a0aec0',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
}

const Sidebar = ({ children }) => {
  const dispatch = useHouseActions()

  const [sortBed, setSortBed] = useState('')
  const [sortBath, setSortBath] = useState('')
  const [sortPrice, setSortPrice] = useState('')
  const [sortProperty, setSortProperty] = useState('')

  const [checked, setChecked] = useState([
    { id: 'Balcony', checked: false },
    { id: 'AirConditioning', checked: false },
    { id: 'Pool', checked: false },
    { id: 'Beach', checked: false },
    { id: 'PetFriendly', checked: false },
    { id: 'KidFriendly', checked: false },
    { id: 'Parking', checked: false },
  ])
  const [sortAmenities, setSortAmenities] = useState('')

  const sortBedHandler = (selectedOption) => {
    dispatch({ type: 'sortBed', selectedOption })
    setSortBed({ ...selectedOption, isDisabled: true })
  }

  const sortBathHandler = (selectedOption) => {
    dispatch({ type: 'sortBath', selectedOption })
    setSortBath({ ...selectedOption, isDisabled: true })
  }

  // Sorting Based on Price
  const sortPriceHandler = (selectedOption) => {
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    dispatch({ type: 'sortPrice', selectedOption })

    setSortPrice({ ...selectedOption, isDisabled: true })
    if (selectedOption.value === '') {
      return dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    }
  }

  // Sorting Based on Property Type
  const propertyHandler = (e) => {
    dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortProperty', selectedOption: e.target.value })

    setSortProperty(e.target.value)
    if (e.target.value === '') {
      return dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    }
  }

  // Sorting Based on Amenities
  const amenitiesHandler = (e) => {
    const index = checked.findIndex((item) => {
      return item.id === e.target.value
    })
    const products = [...checked]
    const selectedProduct = products[index]
    selectedProduct.checked = !selectedProduct.checked
    setChecked(products)

    if (selectedProduct.checked) {
      return setSortAmenities((prevState) => prevState + e.target.value + ' ')
    } else {
      let updatedAmenities = sortAmenities.replace(selectedProduct.id, '').trim()
      return setSortAmenities(updatedAmenities + ' ')
    }
  }

  // Mounting DOM -> set Price Sort on All
  useEffect(() => {
    setSortPrice(priceOptions[0])
  }, [])

  // changing price state => check the amenity option
  useEffect(() => {
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortBed', selectedOption: sortBed })
    dispatch({ type: 'sortBath', selectedOption: sortBath })
  }, [sortPrice, sortProperty])

  // changing amenity state => check and perform other filters
  useEffect(() => {
    dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortBed', selectedOption: sortBed })
    dispatch({ type: 'sortBath', selectedOption: sortBath })
  }, [sortAmenities, sortBed, sortBath])

  return (
    <>
      <div className="hidden sidebar">
        <div className="logo">
          <IconContext.Provider value={{ className: 'workcation' }}>
            <div className="workcation">
              <MdHouseboat />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ className: 'palm-tree' }}>
            <div className="palm-tree">
              <GiPalmTree />
            </div>
          </IconContext.Provider>
          <h2>Work </h2>
          <h2 style={{ color: '#667EEA' }}>cation</h2>
        </div>
        <div className="sidebar-content">
          <div className="bedroom-bathroom">
            <div className="bedroom">
              <p>Bedrooms</p>
              <Select
                styles={customStyles}
                className="select"
                options={options}
                isSearchable={false}
                value={sortBed}
                onChange={sortBedHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
            <div className="bathroom">
              <p>Bathrooms</p>
              <Select
                isSearchable={false}
                styles={customStyles}
                className="select"
                options={options}
                value={sortBath}
                onChange={sortBathHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
          </div>

          <div className="price">
            <p>Price Range</p>
            <Select
              isSearchable={false}
              styles={customStyles}
              className="price-select"
              options={priceOptions}
              value={sortPrice}
              onChange={sortPriceHandler}
              isOptionDisabled={(option) => option.isDisabled}
            />
          </div>

          <div className="hr"></div>

          <div className="property">
            <p>Property Type</p>
            <div>
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="All"
                name="property"
                value=""
              />
              <label htmlFor="All"> All</label>
            </div>
            <div>
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="House"
                name="property"
                value="House"
              />
              <label htmlFor="House"> House</label>
            </div>
            <div>
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle2"
                name="property"
                value="Apartment"
              />
              <label htmlFor="vehicle2"> Apartment</label>
            </div>
            <div>
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle3"
                name="property"
                value="Loft"
              />
              <label htmlFor="vehicle3"> Loft</label>
            </div>
            <div>
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle4"
                name="property"
                value="TownHouse"
              />
              <label htmlFor="vehicle4"> TownHouse</label>
            </div>
          </div>

          <div className="hr"></div>

          <div className="amenities">
            <p>Amenities</p>
            <form action="">
              <label className="form-control">
                <input
                  onChange={(e) => amenitiesHandler(e)}
                  value="Balcony"
                  type="checkbox"
                  name="checkbox"
                />
                Balcony
              </label>

              <label className="form-control">
                <input
                  onChange={(e) => amenitiesHandler(e)}
                  value="AirConditioning"
                  type="checkbox"
                  name="checkbox"
                />
                Air Conditioning
              </label>

              <label className="form-control">
                <input
                  value="Pool"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pool
              </label>

              <label className="form-control">
                <input
                  value="Beach"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Beach
              </label>

              <label className="form-control">
                <input
                  value="PetFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pet friendly
              </label>

              <label className="form-control">
                <input
                  value="KidFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Kid friendly
              </label>

              <label className="form-control">
                <input
                  value="Parking"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Parking
              </label>
            </form>
          </div>

          <div className="update-result">
            <button className="update-btn">Update Result</button>
          </div>
        </div>
      </div>
      <main className="main">
        <Navbar
          sortAmenities={sortAmenities}
          sortProperty={sortProperty}
          sortBath={sortBath}
          sortBed={sortBed}
          sortPrice={sortPrice}
        />
        {children}
      </main>
    </>
  )
}

export default Sidebar
