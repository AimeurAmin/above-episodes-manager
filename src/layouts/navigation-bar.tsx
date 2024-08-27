import { faBell, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsList from '../components/notifications-list';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const toggleNotifications = () => setIsNotificationsOpen(prev => !prev);
  const location = useLocation();

  return (
    <div className='flex w-full justify-center relative'>
      { location.pathname !== '/' && (
        <Link to="/">
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" className="absolute top-1 left-0" />
        </Link>
      )}
      <FontAwesomeIcon icon={faBell} size="xl" className='absolute top-1 right-0 cursor-pointer' onClick={toggleNotifications}/>
      <NotificationsList isOpen={isNotificationsOpen} toggle={toggleNotifications}/>
    </div>
  )
}

export default Navbar