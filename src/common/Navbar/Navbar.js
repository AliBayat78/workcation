import './navbar.css'
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
    <div className="hidden navbar">
      <div className="search-bar">
        {inputText ? null : (
          <IconContext.Provider value={{ className: 'search-icon' }}>
            <div className="search-icon">
              <BsSearch />
            </div>
          </IconContext.Provider>
        )}
        <input
          onChange={(e) => changeHandler(e)}
          value={inputText}
          ref={inputRef}
          className="search-input"
          placeholder="Search by Keywords"
        />
      </div>
      <div className="menu-bar">
        <ul>
          <li>List Your Property</li>
          <li>Trips</li>
          <li>Messages</li>
          <li>Support</li>
        </ul>
        <img alt="" src={Avatar2} />
      </div>
    </div>
  )
}

export default Navbar
