import { useParams } from "react-router-dom"
import { useGetEpisodeByIdQuery } from "../../api/episodes";

const EpisodeDetails = () => {
  const { id } = useParams();

  const { data } = useGetEpisodeByIdQuery(id!, {
    skip: !id
  })

  return (
    <div>{id} - {JSON.stringify(data)}</div>
  )
}

export default EpisodeDetails