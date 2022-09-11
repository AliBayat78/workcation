import HouseComp from '../House-Component/HouseComp'
import { useHouse } from '../../context/HouseProvider'
import { Slide } from 'react-awesome-reveal'

const MainComp = () => {
  const products = useHouse()
  return (
    <section className="flex flex-col items-start w-full h-full overflow-y-scroll">
      <div className="flex flex-col items-start justify-center">
        <h4 className="mt-4 ml-4 text-xl font-graphik text-darkGray">Los Angeles</h4>
        <p className="mt-2 ml-4 text-left font-graphik text-silver text-base">
          Live Like the Stars in these luxurious Southern California estates.
        </p>
      </div>

      <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
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
      <h4 className="mt-4 ml-4 city-title">Phoenix</h4>
      <p className="mt-2 ml-4 text-left  city-intro">
        Escape the cold and enjoy great weather without breaking the bank.
      </p>
      <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
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
                  stars={product.stars}
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
