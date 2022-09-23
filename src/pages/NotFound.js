import Navbar from '../common/Navbar/Navbar'
import Logo404 from '../images/404.png'

const NotFound = () => {
  return (
    <>
      <Navbar disableSearch={true} />
      <img
        className="flex justify-center items-center w-full h-full overflow-y-hidden object-cover"
        src={Logo404}
      />
    </>
  )
}

export default NotFound
