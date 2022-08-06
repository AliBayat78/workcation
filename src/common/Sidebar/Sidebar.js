import './sidebar.css'
import { MdHouseboat } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { GiPalmTree } from 'react-icons/gi'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useHouse, useHouseActions } from '../../context/HouseProvider'

const options = [
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
    // Overwrittes the different states of border
    borderColor: state.isFocused ? '#667EEA' : '#a0aec0',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
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

const Sidebar = () => {
  const products = useHouse()
  const dispatch = useHouseActions()

  const [property, setProperty] = useState('')
  const [sortPrice, setSortPrice] = useState('')

  useEffect(() => {
    setSortPrice(priceOptions[0])
  }, [])

  const propertyHandler = (e) => {
    dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    dispatch({ type: 'sortProperty', selectedOption: e.target.value })
    setProperty(e.target.value)
    if (e.target.value === '') {
      return dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    }
  }

  const sortPriceHandler = (selectedOption) => {
    dispatch({ type: 'sortPrice', selectedOption })
    dispatch({ type: 'sortProperty', selectedOption: property })
    setSortPrice(selectedOption)
    if (selectedOption.value === '') {
      return dispatch({ type: 'sortProperty', selectedOption: property })
    }
  }

  return (
    <div className="sidebar">
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
            />
          </div>
          <div className="bathroom">
            <p>Bathrooms</p>
            <Select
              isSearchable={false}
              styles={customStyles}
              className="select"
              options={options}
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
              <input type="checkbox" name="checkbox" />
              Balcony
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Air Conditioning
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Pool
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Beach
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Pet friendly
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Kid friendly
            </label>

            <label className="form-control">
              <input type="checkbox" name="checkbox" />
              Parking
            </label>
          </form>
        </div>

        <div className="update-result">
          <button className="update-btn">Update Result</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
