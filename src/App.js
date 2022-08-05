import './App.css'
import HouseProvider from './context/HouseProvider'
import HomePage from './pages/Home'

function App() {
  return (
    <HouseProvider>
      <HomePage />
    </HouseProvider>
  )
}

export default App
