import { Link } from 'react-router-dom'
import { NotificationType } from '../api/episodes/types'
import Typography from './typography'
import { useDispatch } from 'react-redux'
import { graphqlApi } from '../api'

const NotificationItem = (props: NotificationType & { toggle: () => void; index: number }) => {
  const { id, series, title, episodeNumber, seasonNumber, eventType, index, toggle } = props

  const event = {
    create: {
      color: "text-green-700",
      message: "New episode"
    },
    update: {
      color: "text-yellow-500",
      message: "Episode updated"
    },
    delete: {
      color: "text-red-500",
      message: "Episode deleted"
    }
  }[eventType];

  const dispatch = useDispatch();
  const handleNotificationClicked = () => {
    toggle();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(graphqlApi.util.updateQueryData('onCreateEpisode', undefined,(draft: NotificationType[]) => {
      draft.splice(index, 1);
    }))
  }
  
  return (
    <Link to={`/${id}`} onClick={handleNotificationClicked} key={id}>
      <div className='rounded-lg bg-primary-50 px-3 py-1 cursor-pointer mb-2'>
        <div className="flex justify-between items-start">
          <Typography className='text-lg w-64 font-medium overflow-hidden overflow-ellipsis text-nowrap'>{series}</Typography>
          <Typography className={`text-xs font-medium overflow-hidden overflow-ellipsis text-nowrap ${event.color}`}>{event.message}</Typography>

        </div>
        <Typography className='text-md w-80  overflow-hidden overflow-ellipsis text-nowrap'>{title}</Typography>
        <Typography className='text-sm w-80  overflow-hidden overflow-ellipsis text-nowrap'>Episode {episodeNumber} - Season {seasonNumber}</Typography>
      </div>
    </Link>
  )
}

export default NotificationItem