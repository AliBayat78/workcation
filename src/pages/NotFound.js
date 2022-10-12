import Navbar from '../common/Navbar/Navbar'
import Logo404 from '../images/404.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Navbar disableSearch={true} />
      <Link to="/" className="flex justify-center items-center mt-5 mb-2 text-white md:hidden">
        <button className=" bg-darkPurple p-2 rounded-lg font-graphik">Back to Home</button>
      </Link>
      <img
        className="flex justify-center items-center w-screen h-screen overflow-y-hidden object-fit"
        src={Logo404}
      />
    </>
  )
}

export default NotFound
