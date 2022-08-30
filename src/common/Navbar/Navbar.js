import './navbar.css'
import Avatar2 from '../../icons/avatar2.jpg'
import { BsSearch } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import { useRef, useState } from 'react'
import { useHouse, useHouseActions } from '../../context/HouseProvider'

const Navbar = () => {
  const products = useHouse()
  const dispatch = useHouseActions()

  const [inputText, setInputText] = useState('')

  const inputRef = useRef()

  const changeHandler = (e) => {
    dispatch({ type: 'search', selectedOption: e.target.value })
    setInputText(e.target.value)
  }

  return (
    <div className="navbar">
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
        <img src={Avatar2} />
      </div>
    </div>
  )
}

export default Navbar
