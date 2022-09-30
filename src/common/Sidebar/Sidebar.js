import './sidebar.css'
import { MdHouseboat } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { GiPalmTree } from 'react-icons/gi'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useHouseActions } from '../../context/HouseProvider'
import Navbar from '../Navbar/Navbar'
import swal from 'sweetalert'
import Searchbar from '../Searchbar/Searchbar'

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

  const [mobileFilters, setMobileFilters] = useState(true)

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

  // for search bar
  const [inputText, setInputText] = useState('')

  const changeHandler = (e) => {
    dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortBed', selectedOption: sortBed })
    dispatch({ type: 'sortBath', selectedOption: sortBath })
    dispatch({ type: 'search', selectedOption: e.target.value })
    setInputText(e.target.value)
  }

  // Mounting DOM -> set Price Sort on All
  useEffect(() => {
    setSortPrice(priceOptions[0])
  }, [])

  // changing price & property state => check the selected bed, bath & amenity
  useEffect(() => {
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortBed', selectedOption: sortBed })
    dispatch({ type: 'sortBath', selectedOption: sortBath })
  }, [sortPrice, sortProperty])

  // change price state => check the selected property
  useEffect(() => {
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
  }, [sortPrice])

  // changing amenity state => check and perform other filters
  useEffect(() => {
    dispatch({ type: 'sortPrice', selectedOption: sortPrice })
    dispatch({ type: 'sortProperty', selectedOption: sortProperty })
    dispatch({ type: 'sortAmenity', selectedOption: sortAmenities })
    dispatch({ type: 'sortBed', selectedOption: sortBed })
    dispatch({ type: 'sortBath', selectedOption: sortBath })
  }, [sortAmenities, sortBed, sortBath])

  return (
    <div className="flex flex-col w-full overflow-y-auto md:overflow-y-hidden md:flex-row">
      <div className="relative flex flex-col md:w-1/3 md:h-screen 2xl:w-1/5 bg-lightGray">
        <div className="flex flex-row justify-between items-center w-full bg-darkGray">
          <div className="flex justify-start md:justify-center items-center md:h-16 text-white bg-darkGray">
            <IconContext.Provider value={{ className: 'text-purple  w-16 h-16' }}>
              <div>
                <MdHouseboat />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: 'w-8 h-8' }}>
              <div>
                <GiPalmTree />
              </div>
            </IconContext.Provider>
            <h2 className="font-graphik font-black text-2xl">Work </h2>
            <h2 className="font-graphik text-2xl text-purple">cation</h2>
          </div>
          <div className="space-y-1.5 mr-4 md:hidden">
            <span className="block w-8 h-1 bg-silver"></span>
            <span className="block w-8 h-1 bg-silver"></span>
            <span className="block w-8 h-1 bg-silver"></span>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative w-full flex flex-row justify-around items-center bg-lightGray h-10 md:hidden">
            <div className="mt-4">
              <Searchbar onChange={(e) => changeHandler(e)} disabled={false} value={inputText} />
            </div>
            <button
              onClick={() => setMobileFilters((prevState) => !prevState)}
              className={`${mobileFilters ? 'bg-silver' : 'bg-darkGray'} flex flex-row  w-28 h-10 rounded-lg mt-4 justify-center items-center`}
            >
              <div className="space-y-1 flex flex-col items-center mr-4 md:hidden">
                <span className="block w-6 h-0.5 bg-lightSilver"></span>
                <span className="block w-4 h-0.5 bg-lightSilver"></span>
                <span className="block w-2.5 h-0.5 bg-lightSilver"></span>
              </div>
              <p className="text-white">Filters</p>
            </button>
          </div>
          <div className="w-full bg-darkGray h-px mt-5 md:hidden"></div>
          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 flex flex-row justify-around`}
          >
            <div className="flex lg:w-2/5 flex-col justify-start items-start mt-2 xl:mt-2 lg:mt-1 text-white">
              <p className="text-lightSilver md:text-xs xl:text-sm">Bedrooms</p>
              <Select
                styles={customStyles}
                className="w-40 md:w-28 h-8 xl:h-10 lg:w-full"
                options={options}
                isSearchable={false}
                value={sortBed}
                onChange={sortBedHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
            <div className="flex lg:w-2/5 flex-col justify-start items-start mt-2 xl:mt-2 lg:mt-1 text-white">
              <p className="text-lightSilver md:text-xs xl:text-sm">Bathrooms</p>
              <Select
                isSearchable={false}
                styles={customStyles}
                className="w-40 md:w-28 h-8 xl:h-10 lg:w-full"
                options={options}
                value={sortBath}
                onChange={sortBathHandler}
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
          </div>

          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 flex flex-col text-center justify-center items-center md:items-start mt-2 lg:mt-1 xl:mt-2 ml-2 lg:ml-4 pr-2`}
          >
            <p className="text-lightSilver text-left md:text-xs xl:text-sm">Price Range</p>
            <Select
              isSearchable={false}
              styles={customStyles}
              className="w-96 md:w-60 md:h-8 xl:h-12 lg:w-full"
              options={priceOptions}
              value={sortPrice}
              onChange={sortPriceHandler}
              isOptionDisabled={(option) => option.isDisabled}
            />
          </div>

          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 w-full bg-darkGray h-px mt-5 lg:mt-2 xl:mt-3`}
          ></div>

          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 flex flex-col content-around md:text-xs xl:text-sm items-start ml-6 mt-2 lg:mt-1`}
          >
            <p className="text-lightSilver">Property Type</p>
            <div className="mt-3 lg:mt-2 xl:mt-3 text-white font-graphik flex flex-row justify-center items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="All"
                name="property"
                value=""
              />
              <label className="ml-4 cursor-pointer" htmlFor="All">
                All
              </label>
            </div>
            <div className="mt-3 lg:mt-2 text-white font-graphik flex flex-row justify-center items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="House"
                name="property"
                value="House"
              />
              <label className="ml-2 cursor-pointer" htmlFor="House">
                House
              </label>
            </div>
            <div className="mt-3 lg:mt-2 text-white font-graphik flex flex-row justify-center items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="Apartment"
                name="property"
                value="Apartment"
              />
              <label className="ml-2 cursor-pointer" htmlFor="vehicle2">
                Apartment
              </label>
            </div>
            <div className="mt-3 lg:mt-2 text-white font-graphik flex flex-row justify-center items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="Loft"
                name="property"
                value="Loft"
              />
              <label className="ml-2 cursor-pointer" htmlFor="vehicle3">
                Loft
              </label>
            </div>
            <div className="mt-3 lg:mt-2 text-white font-graphik flex flex-row justify-center items-center">
              <input
                onChange={(e) => propertyHandler(e)}
                type="radio"
                id="TownHouse"
                name="property"
                value="TownHouse"
              />
              <label className="ml-2 cursor-pointer" htmlFor="vehicle4">
                TownHouse
              </label>
            </div>
          </div>

          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 w-full bg-darkGray h-px mt-5 lg:mt-2 xl:mt-3`}
          ></div>

          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 flex flex-col justify-around items-start ml-6 mt-2 lg:text-xs xl:text-sm lg:mt-1`}
          >
            <p className="text-lightSilver">Amenities</p>
            <form className="flex flex-col justify-between">
              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  onChange={(e) => amenitiesHandler(e)}
                  value="Balcony"
                  type="checkbox"
                  name="checkbox"
                />
                Balcony
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  className="mr-5"
                  onChange={(e) => amenitiesHandler(e)}
                  value="AirConditioning"
                  type="checkbox"
                  name="checkbox"
                />
                Air Conditioning
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  value="Pool"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pool
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  value="Beach"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Beach
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  value="PetFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Pet friendly
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
                <input
                  value="KidFriendly"
                  onChange={(e) => amenitiesHandler(e)}
                  type="checkbox"
                  name="checkbox"
                />
                Kid friendly
              </label>

              <label className="flex flex-row items-center my-2 lg:my-1 xl:my-2 text-white font-graphik cursor-pointer">
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
          <div
            className={`${
              mobileFilters ? 'visible' : 'hidden'
            } ease-in-out duration-300 relative xl:-bottom-36 w-full h-20 flex justify-center items-center`}
          >
            <button
              onClick={() => onUpdate()}
              className="bg-purple hover:bg-darkPurple md:fixed md:bottom-4 text-white md:text-xs xl:text-lg font-graphik rounded-xl cursor-pointer py-2.5 px-10 font-bold"
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
    </div>
  )
}

export default Sidebar
