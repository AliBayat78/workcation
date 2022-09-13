import Avatar2 from '../../icons/avatar2.jpg'
import { BsSearch } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import { useRef, useState } from 'react'
import { useHouseActions } from '../../context/HouseProvider'

const Navbar = ({ sortAmenities, sortPrice, sortProperty, sortBed, sortBath }) => {
  const dispatch = useHouseActions()

  const [inputText, setInputText] = useState('')

  const inputRef = useRef()

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
        {inputText ? null : (
          <IconContext.Provider
            value={{
              className:
                'md:w-7 md:h-7 md:p-1 md:absolute md:top-5 md:left-1 md:transform md:-translate-y-1/2 md:text-darkGray',
            }}
          >
            <div>
              <BsSearch />
            </div>
          </IconContext.Provider>
        )}
        <input
          onChange={(e) => changeHandler(e)}
          value={inputText}
          ref={inputRef}
          className="md:box-border md:bg-mainBg md:rounded-lg md:p-0.5 md:border-0 md:min-w-40 lg:w-60 xl:w-80 2xl:w-96  md:h-10 md:outline-none md:placeholder:text-silver md:placeholder:pl-8 md:placeholder:font-light md:placeholder:text-sm 2xl:placeholder:text-lg"
          placeholder="Search by Keywords"
        />
      </div>
      <div className="md:flex xl:w-full md:flex-row md:justify-end md:items-center md:mr-8">
        <ul className="md:w-80 xl:w-3/5 2xl:mr-0 md:flex md:flex-row md:justify-around md:font-graphik md:text-xs lg:text-sm xl:text-base 2xl:text-lg md:text-darkGray">
          <li>List Your Property</li>
          <li>Trips</li>
          <li>Messages</li>
          <li>Support</li>
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
