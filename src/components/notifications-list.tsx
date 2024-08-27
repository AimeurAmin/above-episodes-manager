import { FC } from 'react';
import { useOnCreateEpisodeQuery } from '../api/episodes';
import { NotificationType } from '../api/episodes/types';
import NotificationItem from './notification-item';

type Props = {
  isOpen: boolean;
  toggle: () => void;
}

const NotificationsList: FC<Props> = ({ isOpen, toggle }) => {
  const { data: createdEpisodes } = useOnCreateEpisodeQuery();
  console.log({createdEpisodes});
  
  return (
    <div>
      {isOpen && <div className='p-4 border border-primary-200 rounded-xl bg-white overflow-hidden w-[30%] absolute top-10 right-0 z-20'>
        <div className=" overflow-y-auto max-h-[40dvh] scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-300 pr-1">
          {createdEpisodes && createdEpisodes.length && 
            createdEpisodes.map((event: NotificationType) => <NotificationItem {...event} toggle={toggle}/>)
          }
        </div>
      </div>}
      <div className="absolute top-0 left-0 z-10" onClick={toggle} />
    </div>
  )
}

export default NotificationsList