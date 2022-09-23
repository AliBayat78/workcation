import HouseComp from '../House-Component/HouseComp'
import { useHouse } from '../../context/HouseProvider'
import { Slide } from 'react-awesome-reveal'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './main.css'

const MainComp = () => {
  const products = useHouse()
  // skeleton loading
  const [isLoading, setIsLoading] = useState(true)

  const LosAngeles = products.filter((item) => {
    return item.city === 'Los Angeles'
  })

  const Phoenix = products.filter((item) => {
    return item.city === 'Phoenix'
  })

  // skeleton loading -> on CDM
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  const LA_loadingProducts = () => {
    if (LosAngeles.length === false) {
      return null
    } else if (isLoading) {
      return (
        <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
          <Slide duration={1000}>
            {LosAngeles.map((p) => {
              return (
                <div key={p.id}>
                  <Skeleton width={350} height={320} className="img-skeleton" />
                  <Skeleton
                    width={280}
                    height={150}
                    baseColor="#e2e8f0"
                    className="information-skeleton"
                  />
                </div>
              )
            })}
          </Slide>
        </div>
      )
    } else if (!isLoading && LosAngeles.length) {
      return (
        <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
          <Slide duration={1000}>
            {LosAngeles.map((product) => {
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
            })}
          </Slide>
        </div>
      )
    } else {
      return null
    }
  }
  const Px_loadingProducts = () => {
    if (Phoenix.length === false) {
      return null
    } else if (isLoading) {
      return (
        <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
          <Slide duration={1000}>
            {Phoenix.map((p) => {
              return (
                <div key={p.id}>
                  <Skeleton width={350} height={320} className="img-skeleton" />
                  <Skeleton
                    width={280}
                    height={150}
                    baseColor="#e2e8f0"
                    className="information-skeleton"
                  />
                </div>
              )
            })}
          </Slide>
        </div>
      )
    } else if (!isLoading && Phoenix.length) {
      return (
        <div className="w-full md:w-4/5 2xl:w-full flex flex-col items-center justify-around flex-auto flex-wrap md:flex-row">
          <Slide duration={1000}>
            {Phoenix.map((product) => {
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
            })}
          </Slide>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <section className="flex flex-col items-start w-full h-full overflow-y-scroll">
      {LosAngeles.length ? (
        <div className="flex flex-col items-start justify-center">
          <h4 className="mt-4 ml-4 text-xl font-graphik text-darkGray">Los Angeles</h4>
          <p className="mt-2 ml-4 text-left font-graphik text-silver text-base">
            Live Like the Stars in these luxurious Southern California estates.
          </p>
        </div>
      ) : null}

      {LA_loadingProducts()}

      {Phoenix.length ? (
        <div className="flex flex-col items-start justify-center">
          <h4 className="mt-4 ml-4 city-title">Phoenix</h4>
          <p className="mt-2 ml-4 text-left  city-intro">
            Escape the cold and enjoy great weather without breaking the bank.
          </p>
        </div>
      ) : null}

      {Px_loadingProducts()}
    </section>
  )
}

export default MainComp
