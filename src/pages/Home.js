import Navbar from '../common/Navbar/Navbar'
import Sidebar from '../common/Sidebar/Sidebar'

const HomePage = () => {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Navbar />
        <section className="products-container">
          <h4>Los Angeles</h4>
          <p>Live Like the Stars in these luxurious Southern California estates.</p>
          <div className='product'></div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
