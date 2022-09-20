import HomePage from './pages/Home'
import ListProperty from './pages/ListProperty'
import Messages from './pages/Messages'
import NotFound from './pages/NotFound'
import Support from './pages/Support'
import Trips from './pages/Trips'

const routes = [
  { path: '/', component: HomePage },
  { path: '/Support', component: Support },
  { path: '/Messages', component: Messages },
  { path: '/Trips', component: Trips },
  { path: '/Properties', component: ListProperty },
  { path: '*', component: NotFound}
]

export default routes
