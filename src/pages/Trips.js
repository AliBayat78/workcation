import Navbar from '../common/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Trips = () => {
  return (
    <>
      <Navbar disableSearch={true} />
      <Link to="/" className="flex justify-center items-center mt-5 text-white md:hidden">
        <button className=" bg-darkPurple p-2 rounded-lg font-graphik">Back to Home</button>
      </Link>
      <h1 className="flex w-full justify-center items-center mt-10">
        Trips Page: Not Developed Yet
      </h1>
    </>
  )
}

export default Trips
