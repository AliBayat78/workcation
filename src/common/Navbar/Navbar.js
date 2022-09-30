import Avatar2 from '../../icons/avatar2.jpg'
import { useState } from 'react'
import { useHouseActions } from '../../context/HouseProvider'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'

const Navbar = ({ sortAmenities, sortPrice, sortProperty, sortBed, sortBath, disableSearch }) => {
  const dispatch = useHouseActions()

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

  return (
    <div className="hidden md:w-full md:flex md:flex-row md:justify-between md:items-center md:h-16 md:bg-white">
      <div className="md:relative md:ml-2">
        <Searchbar onChange={(e) => changeHandler(e)} disabled={disableSearch} value={inputText} />
      </div>
      <div className="md:flex xl:w-full md:flex-row md:justify-end md:items-center md:mr-8">
        <ul className="md:w-80 xl:w-3/5 2xl:mr-0 md:flex md:flex-row md:justify-around md:font-graphik md:text-xs lg:text-sm xl:text-base 2xl:text-lg md:text-darkGray">
          <Link
            to="/Properties"
            className="md:bg-white md:p-2 md:rounded-md md:cursor-pointer md:hover:bg-purple md:hover:text-white"
          >
            List Your Property
          </Link>
          <Link
            to="/Trips"
            className="md:bg-white md:p-2 md:rounded-md md:cursor-pointer md:hover:bg-purple md:hover:text-white"
          >
            Trips
          </Link>
          <Link
            to="/Messages"
            className="md:bg-white md:p-2 md:rounded-md md:cursor-pointer md:hover:bg-purple md:hover:text-white"
          >
            Messages
          </Link>
          <Link
            to="/Support"
            className="md:bg-white md:p-2 md:rounded-md md:cursor-pointer md:hover:bg-purple md:hover:text-white"
          >
            Support
          </Link>
          <Link
            to="/"
            className="md:bg-white md:p-2 md:rounded-md md:cursor-pointer md:hover:bg-purple md:hover:text-white"
          >
            Home
          </Link>
        </ul>
        <img
          className="md:w-10 md:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 md:rounded-full"
          alt=""
          src={Avatar2}
        />
      </div>
    </div>
  )
}

export default Navbar
