import Plus from '../Plus/Plus'
import ReactStars from 'react-rating-stars-component'

const HouseComp = ({ image, title, price, features, plus, type, stars }) => {
  return (
    <div className="my-4 mx-4 flex flex-col items-center text-xs sm:text-base font-graphik">
      <img
        alt=""
        className="shadow-2xl rounded-lg w-5/6 h-5/6 sm:w-96 sm:h-80 md:w-96 md:h-80 xl:w-96 xl:h-80 2xl:w-96 2xl:h-80"
        src={image}
      />
      <div className="bg-white z-10 w-2/3 h-2/3 sm:w-80 sm:h-40 md:w-80 md:h-40 xl:w-80 xl:h-40 2xl:w-80 2xl:h-40 shadow-xl -mt-16 rounded-lg flex flex-col items-start justify-between">
        <span className="mt-4 ml-4 text-xs sm:text-base flex flex-row uppercase text-silver">
          {plus ? <Plus /> : null}
          {features}
        </span>
        <h3 className="ml-4">{title}</h3>
        <h3 className="text-gray-800 font-extrabold ml-4">{type}</h3>
        <p className="ml-4 text-xs sm:text-base houseComp-price">
          ${price} <span className="text-xs text-silver">/wk</span>
        </p>
        <div className="flex flex-row items-center justify-center mb-4 ml-4">
          <ReactStars
            count={5}
            edit={false}
            value={stars}
            size={20}
            isHalf={true}
            activeColor="#38B2AC"
          />
          <p className="ml-2">34 Reviews</p>
        </div>
      </div>
    </div>
  )
}

export default HouseComp
