import { BsSearch } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import { useRef } from 'react'

const Searchbar = ({ onChange, disabled, value }) => {
  const inputRef = useRef()

  return (
    <div className="flex flex-row justify-center items-center">
      {value ? null : (
        <IconContext.Provider
          value={{
            className:
              'w-7 h-7 p-1 text-lightSilver focus:text-darkGray absolute md:top-5 md:left-1 transform -translate-y-1/2 md:text-darkGray',
          }}
        >
          <div>
            <BsSearch />
          </div>
        </IconContext.Provider>
      )}
      <input
        onChange={onChange}
        value={value}
        ref={inputRef}
        className="box-border bg-darkGray focus:bg-mainBg focus:placeholder:text-silver md:bg-mainBg rounded-lg p-1 border-0 min-w-40 lg:w-60 xl:w-80 2xl:w-96  h-10 outline-none placeholder:text-lightSilver md:placeholder:text-silver placeholder:pl-8 placeholder:font-light md:placeholder:text-sm 2xl:placeholder:text-lg"
        placeholder="Search by Keywords"
        disabled={disabled}
      />
    </div>
  )
}

export default Searchbar
