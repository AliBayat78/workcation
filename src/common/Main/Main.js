import HouseComp from '../House-Component/HouseComp'
import { useHouse } from '../../context/HouseProvider'
import { Slide } from 'react-awesome-reveal'

const MainComp = () => {
  const products = useHouse()
  return (
    <section className="products-container">
      <h4 className="city-title">Los Angeles</h4>
      <p className="city-intro">
        Live Like the Stars in these luxurious Southern California estates.
      </p>

      <div className="product">
        <Slide duration={1000}>
          {products.map((product) => {
            if (product.city === 'Los Angeles') {
              return (
                <HouseComp
                  key={product.id}
                  image={product.url}
                  title={product.title}
                  price={product.price}
                  features={product.features}
                  plus={product.plus}
                  type={product.type}
                  stars={product.stars}
                />
              )
            }
          })}
        </Slide>
      </div>
      <h4 className="city-title">Phoenix</h4>
      <p className="city-intro">
        Escape the cold and enjoy great weather without breaking the bank.
      </p>
      <div className="product">
        <Slide duration={1000}>
          {products.map((product) => {
            if (product.city === 'Phoenix') {
              return (
                <HouseComp
                  key={product.id}
                  image={product.url}
                  title={product.title}
                  price={product.price}
                  features={product.features}
                  plus={product.plus}
                  type={product.type}
                />
              )
            }
          })}
        </Slide>
      </div>
    </section>
  )
}

export default MainComp
