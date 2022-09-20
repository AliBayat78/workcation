import './App.css'
import HouseProvider from './context/HouseProvider'
import routes from './routes'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HouseProvider>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={<route.component />} />
        })}
      </Routes>
    </HouseProvider>
  )
}

export default App
