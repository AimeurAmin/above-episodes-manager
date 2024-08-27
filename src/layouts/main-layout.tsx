import { Outlet } from 'react-router-dom'
import Navbar from './navigation-bar'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout