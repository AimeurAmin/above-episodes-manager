import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { EpisodeType } from '../api/episodes/types'
import moment from 'moment'
import { useDeleteEpisodeMutation } from '../api/episodes'
import toast from 'react-hot-toast'

type CardPropsType = EpisodeType & { updateEpisode: (episode: EpisodeType) => void }

const Card: FC<CardPropsType> = (props) => {
  const { updateEpisode, ...episode } = props;
  const { id, series, title, description, releaseDate, episodeNumber, seasonNumber } = episode;

  const updateEpisodeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    e.stopPropagation();
    updateEpisode(episode);
  }

  const [triggerDeleteEpisode, { isLoading: isDeleting }] = useDeleteEpisodeMutation();

  const handleDeleteEpisode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    e.stopPropagation();
    toast.promise(triggerDeleteEpisode(episode).unwrap(), {
      loading: 'Deleting the episode...',
      success: 'Episode deleted.',
      error: 'An error occured while deleting the episode!'
    })
  }

  return (
    <div className="bg-purple-50 p-4 rounded-xl shadow-lg">
      <div>
        <div className='flex justify-between'>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-xs text-gray-500">{moment(releaseDate).format("YYYY - MM - DD")}</span>
        </div>
        <p className="text-sm text-gray-600">
          {series} - Season {seasonNumber} - Episode {episodeNumber}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          {description}
        </p>
      </div>
      <div className="flex space-x-2 mt-2 ml-auto w-fit">
        <button className="text-gray-600 hover:text-purple-600">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="text-gray-600 hover:text-purple-600" onClick={updateEpisodeHandler}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="text-gray-600 hover:text-purple-600" onClick={handleDeleteEpisode} disabled={isDeleting}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default Card