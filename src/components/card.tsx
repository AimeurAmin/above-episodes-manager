import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { EpisodeType } from '../api/episodes/types'
import moment from 'moment'


const Card: FC<EpisodeType> = (props) => {
  const { series, title, description, releaseDate, episodeNumber, seasonNumber } = props;
  
  return (
    <div className="bg-purple-50 p-4 rounded-xl shadow-lg">
      <div>
        <div className='flex justify-between'>
          <h3 className="text-lg font-semibold text-gray-800">{series}</h3>
          <span className="text-xs text-gray-500">{moment(releaseDate).format("YYYY - MM - DD")}</span>
        </div>
        <p className="text-sm text-gray-600">
          {title} - Season {seasonNumber} - Episode {episodeNumber}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          {description}
        </p>
      </div>
      <div className="flex space-x-2 mt-2 ml-auto w-fit">
        <button className="text-gray-600 hover:text-purple-600">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="text-gray-600 hover:text-purple-600">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="text-gray-600 hover:text-purple-600">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default Card