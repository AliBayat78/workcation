import './HouseComp.css'
import Plus from '../Plus/Plus'
import ReactStars from 'react-rating-stars-component'

const HouseComp = ({ image, title, price, features, plus, type, stars }) => {
  return (
    <div className="my-4 mx-4 flex flex-col items-center House-Components">
      <img className="w-30 h-30 shadow-2xl rounded-lg" src={image} />
      <div className="bg-white shadow-xl w-80 h-21 -mt-16 rounded-lg flex flex-col items-start justify-between House-Intro">
        <span className="mt-4 ml-4 flex flex-row uppercase bed-bath">
          {plus ? <Plus /> : null}
          {features}
        </span>
        <h3 className="ml-4">{title}</h3>
        <h3 className="text-gray-800 font-extrabold ml-4">{type}</h3>
        <p className="ml-4 houseComp-price">
          ${price} <span>/wk</span>
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
