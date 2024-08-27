import { Outlet } from 'react-router-dom'
import Navbar from './navigation-bar'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout