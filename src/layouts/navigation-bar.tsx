import { faBell, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsList from '../components/notifications-list';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOnCreateEpisodeQuery } from '../api/episodes';

const Navbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const toggleNotifications = () => setIsNotificationsOpen(prev => !prev);
  const location = useLocation();
  const { data: notifications } = useOnCreateEpisodeQuery();

  return (
    <div className='flex w-full justify-center relative'>
      { location.pathname !== '/' && (
        <Link to="/">
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" className="absolute top-1 left-0" />
        </Link>
      )}
      <FontAwesomeIcon icon={faBell} size="xl" className='absolute top-1 right-0 cursor-pointer z-10' onClick={toggleNotifications}/>
      {
        notifications && Boolean(notifications.length) && (
          <div 
            className="rounded-full w-4 h-4 text-white bg-red-500 text-[10px] flex items-center justify-center absolute top-0 right-3 z-20"
          >{notifications.length}</div>
        )
      }
      <NotificationsList isOpen={isNotificationsOpen} toggle={toggleNotifications}/>
    </div>
  )
}

export default Navbar