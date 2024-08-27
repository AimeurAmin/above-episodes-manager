import { FC } from 'react';
import { createPortal } from 'react-dom';
import { NotificationType } from '../api/episodes/types';
import NotificationItem from './notification-item';
import Typography from './typography';
import { useSubscribeToEpisodesEventsQuery } from '../api/episodes';

type Props = {
  isOpen: boolean;
  toggle: () => void;
}

const NotificationsList: FC<Props> = ({ isOpen, toggle }) => {
  const { data: createdEpisodes } = useSubscribeToEpisodesEventsQuery();

  const modalRoot = (document.getElementById('modal-root'));
  if(!modalRoot) return <></>;
  return createPortal(
    <div>
      {isOpen && ([
        <div className='p-4 mx-4 border border-primary-200 rounded-xl bg-white overflow-hidden min-w-[30%] absolute top-12 right-0 z-20'>
          <div className=" overflow-y-auto max-h-[40dvh] scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-300 pr-1">
            {createdEpisodes && createdEpisodes.length ? 
              createdEpisodes.map(
                (event: NotificationType, index: number) => (
                  <NotificationItem {...event} index={index} toggle={toggle}/>
                )
              ): <Typography className='text-center'>No notifications yet.</Typography>
            }
          </div>
        </div>,
        <div className='fixed inset-0 overflow-hidden z-[1]' onClick={toggle}/>
      ])}
    </div>
    ,
    modalRoot
  )
}

export default NotificationsList