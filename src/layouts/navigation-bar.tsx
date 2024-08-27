import { faBell, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <div className='flex w-full justify-center relative'>
      <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" className="absolute top-1 left-0" />
      <FontAwesomeIcon icon={faBell} size="2xl" className='absolute top-1 right-0'/>
    </div>
  )
}

export default Navbar