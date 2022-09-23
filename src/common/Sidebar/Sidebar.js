import './sidebar.css'
import { MdHouseboat } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { GiPalmTree } from 'react-icons/gi'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useHouseActions } from '../../context/HouseProvider'
import Navbar from '../Navbar/Navbar'
import swal from 'sweetalert'

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

const onUpdate = () => {
  swal(
    'Everything is Updated Already',
    'This is a SPA (Single Page Application) & This Button is Just For Decoration',
    'info',
  )
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
    swal('Updated!', 'Products Has Been Sorted by Bed Numbers', 'success')
  }

  const sortBathHandler = (selectedOption) => {
    dispatch({ type: 'sortBath', selectedOption })
    setSortBath({ ...selectedOption, isDisabled: true })
    swal('Updated!', 'Products Has Been Sorted by Bath Numbers', 'success')
  }

  // Sorting Based on Price
  const sortPriceHandler = (selectedOption) => {
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    dispatch({ type: 'sortPrice', selectedOption })

    setSortPrice({ ...selectedOption, isDisabled: true })
    if (selectedOption.value === '') {
      return dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    }
    swal('Updated!', 'Products Has Been Sorted by Prices', 'success')
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
      <div className="hidden md:relative md:flex md:flex-col md:w-1/3 md:h-screen 2xl:w-1/5 md:bg-lightGray">
        <div className="md:flex md:justify-center md:items-center md:w-full md:h-16 md:text-white md:bg-darkGray">
          <IconContext.Provider value={{ className: 'md:text-purple  md:w-16 md:h-16' }}>
            <div>
              <MdHouseboat />
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ className: 'md:w-8 md:h-8' }}>
            <div>
              <GiPalmTree />
            </div>
          </IconContext.Provider>
          <h2 className="md:font-graphik md:font-black md:text-2xl">Work </h2>
          <h2 className="md:font-graphik md:text-2xl md:text-purple">cation</h2>
        </div>
        <div className="md:relative md:w-full">
          <div className="md:flex md:flex-row md:justify-around">
            <div className="md:flex lg:w-2/5 md:flex-col md:justify-start md:items-start md:mt-2 xl:mt-2 lg:mt-1 md:text-white">
              <p className="md:text-lightSilver md:text-xs xl:text-sm">Bedrooms</p>
              <Select
                styles={customStyles}
                className="md:w-28 md:h-8 xl:h-10 lg:w-full"
                options={options}
                isSearchable={false}
                value={sortBed}
                onChange={sortBedHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
            <div className="md:flex lg:w-2/5 md:flex-col md:justify-start md:items-start md:mt-2 xl:mt-2 lg:mt-1 md:text-white">
              <p className="md:text-lightSilver md:text-xs xl:text-sm">Bathrooms</p>
              <Select
                isSearchable={false}
                styles={customStyles}
                className="md:w-28 md:h-8 xl:h-10 lg:w-full"
                options={options}
                value={sortBath}
                onChange={sortBathHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
          </div>

          <div className="md:flex md:flex-col md:text-center md:justify-center md:items-start md:mt-2 lg:mt-1 xl:mt-2 md:ml-2 lg:ml-4 md:pr-2">
            <p className="md:text-lightSilver text-left md:text-xs xl:text-sm">Price Range</p>
            <Select
              isSearchable={false}
              styles={customStyles}
              className="md:w-60 md:h-8 xl:h-12 lg:w-full"
              options={priceOptions}
              value={sortPrice}
              onChange={sortPriceHandler}
              isOptionDisabled={(option) => option.isDisabled}
            />
          </div>

          <div className="md:w-full md:bg-darkGray md:h-px md:mt-5 lg:mt-3 xl:mt-2"></div>

          <div className="md:flex md:flex-col md:content-around md:text-xs xl:text-sm md:items-start md:ml-6 md:mt-2 lg:mt-1">
            <p className="md:text-lightSilver">Property Type</p>
            <div className="md:mt-3 lg:mt-2 xl:mt-3 md:text-white md:font-graphik md:flex md:flex-row md:justify-center md:items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="All"
                name="property"
                value=""
              />
              <label className="md:ml-4 cursor-pointer" htmlFor="All">
                All
              </label>
            </div>
            <div className="md:mt-3 lg:mt-2 md:text-white md:font-graphik md:flex md:flex-row md:justify-center md:items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="House"
                name="property"
                value="House"
              />
              <label className="md:ml-2 cursor-pointer" htmlFor="House">
                House
              </label>
            </div>
            <div className="md:mt-3 lg:mt-2 md:text-white md:font-graphik md:flex md:flex-row md:justify-center md:items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle2"
                name="property"
                value="Apartment"
              />
              <label className="md:ml-2 cursor-pointer" htmlFor="vehicle2">
                Apartment
              </label>
            </div>
            <div className="md:mt-3 lg:mt-2 md:text-white md:font-graphik md:flex md:flex-row md:justify-center md:items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle3"
                name="property"
                value="Loft"
              />
              <label className="md:ml-2 cursor-pointer" htmlFor="vehicle3">
                Loft
              </label>
            </div>
            <div className="md:mt-3 lg:mt-2 md:text-white md:font-graphik md:flex md:flex-row md:justify-center md:items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="vehicle4"
                name="property"
                value="TownHouse"
              />
              <label className="md:ml-2 cursor-pointer" htmlFor="vehicle4">
                TownHouse
              </label>
            </div>
          </div>

          <div className="md:w-full md:bg-darkGray md:h-px md:mt-5 lg:mt-2 xl:mt-3"></div>

          <div className="md:flex md:flex-col md:justify-around md:items-start md:ml-6 md:mt-2 lg:text-xs xl:text-sm lg:mt-1">
            <p className="md:text-lightSilver">Amenities</p>
            <form className="md:flex md:flex-col md:justify-between" action="">
              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  onChange={(e) => amenitiesHandler(e)}
                  value="Balcony"
                  type="checkbox"
                  name="checkbox"
                />
                Balcony
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  className="md:mr-5"
                  onChange={(e) => amenitiesHandler(e)}
                  value="AirConditioning"
                  type="checkbox"
                  name="checkbox"
                />
                Air Conditioning
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  value="Pool"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pool
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  value="Beach"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Beach
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  value="PetFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pet friendly
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
                <input
                  value="KidFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Kid friendly
              </label>

              <label className="md:flex md:flex-row md:items-center md:my-2 lg:my-1 xl:my-2 md:text-white md:font-graphik md:cursor-pointer">
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
          <div className="md:relative xl:-bottom-36 md:w-full md:h-20 md:flex md:justify-center md:items-center">
            <button
              onClick={() => onUpdate()}
              className="md:bg-purple md:hover:bg-darkPurple md:fixed md:bottom-4 md:text-white md:text-xs xl:text-lg md:font-graphik md:rounded-xl md:cursor-pointer md:py-2.5 md:px-10 md:font-bold"
            >
              Update Result
            </button>
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
          disableSearch={false}
        />
        {children}
      </main>
    </>
  )
}

export default Sidebar
