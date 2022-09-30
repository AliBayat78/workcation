import Sidebar from '../common/Sidebar/Sidebar'
import MainComp from '../components/Main/Main'

const HomePage = () => {
  return (
    <div className="App">
      <Sidebar>
        <MainComp />
      </Sidebar>
    </div>
  )
}

export default HomePage
