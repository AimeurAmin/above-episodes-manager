import { useParams } from "react-router-dom"
import { useGetEpisodeByIdQuery, useGetOmdbEpisodeByIdQuery } from "../../api/episodes";

const EpisodeDetails = () => {
  const { id } = useParams();

  const { data } = useGetEpisodeByIdQuery(id!, {
    skip: !id
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { data: omdbDetails } = useGetOmdbEpisodeByIdQuery(data?.imdbId!, {
    skip: !data?.imdbId
  })

  console.log(omdbDetails);
  

  // console.log(omdbDetails);
  
  return (
    <div>{id} - {JSON.stringify(data)} 
      <div>{data?.imdbId} - {JSON.stringify(omdbDetails)}</div>
      {omdbDetails?.Poster && <img src={omdbDetails.Poster} />}
    </div>
  )
}

export default EpisodeDetails