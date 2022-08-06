import HouseComp from '../common/House-Component/HouseComp'
import Navbar from '../common/Navbar/Navbar'
import Sidebar from '../common/Sidebar/Sidebar'
import { useHouse } from '../context/HouseProvider'

const HomePage = () => {
  const products = useHouse()

  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Navbar />
        <section className="products-container">
          <h4 className="city-title">Los Angeles</h4>
          <p className="city-intro">
            Live Like the Stars in these luxurious Southern California estates.
          </p>

          <div className="product">
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
                  />
                )
              }
            })}
          </div>
          <h4 className="city-title">Phoenix</h4>
          <p className="city-intro">
            Escape the cold and enjoy great weather without breaking the bank.
          </p>
          <div className="product">
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
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
