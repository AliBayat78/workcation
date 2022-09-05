import './HouseComp.css'
import Plus from '../Plus/Plus'
import ReactStars from 'react-rating-stars-component'

const HouseComp = ({ image, title, price, features, plus, type, stars }) => {
  return (
    <div className="House-Components">
      <img src={image} />
      <div className="House-Intro">
        <span className="bed-bath">
          {plus ? <Plus /> : null}
          {features}
        </span>
        <h3>{title}</h3>
        <h3 className="text-gray-800 font-bold">{type}</h3>
        <p className="houseComp-price">
          ${price} <span>/wk</span>
        </p>
        <div className="reviews">
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
