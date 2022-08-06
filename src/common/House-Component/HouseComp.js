import './HouseComp.css'
import Plus from '../Plus/Plus'

const HouseComp = ({ image, title, price, features, plus, type }) => {
  return (
    <div className="House-Components">
      <img src={image} />
      <div className="House-Intro">
        <span className="bed-bath">
          {plus ? <Plus /> : null}
          {features}
        </span>
        <h3>{title}</h3>
        <p>{type}</p>
        <p className="houseComp-price">
          ${price} <span>/wk</span>
        </p>
        <p className="reviews">34 Reviews</p>
      </div>
    </div>
  )
}

export default HouseComp
