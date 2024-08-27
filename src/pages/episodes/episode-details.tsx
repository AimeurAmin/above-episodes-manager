import { useParams } from "react-router-dom"
import { useGetEpisodeByIdQuery, useGetOmdbEpisodeByIdQuery } from "../../api/episodes";
import Typography from "../../components/typography";

const EpisodeDetails = () => {
  const { id } = useParams();

  const { data: episode } = useGetEpisodeByIdQuery(id!, {
    skip: !id
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { data: omdbDetails } = useGetOmdbEpisodeByIdQuery(episode?.imdbId!, {
    skip: !episode?.imdbId
  }) 

  
  return (
    <div className="flex flex-col items-center flex-1 ">
      <Typography className="text-center text-primary-900 text-2xl w-[90%] font-bold text-ellipsis overflow-hidden text-nowrap mb-10">
        {episode?.series}
      </Typography>
      <div className="bg-purple-100 p-4 flex flex-row justify-between w-full">
        <div className="flex-1 pr-4 w-full">
          <h2 className="text-xl font-bold mb-2">{episode?.title}</h2>
          <h3 className="text-lg font-semibold mb-4">Episode {episode?.episodeNumber} - Season {episode?.seasonNumber}</h3>
          

          <p className="mb-4">{episode?.description}</p>

          
          <div className="mb-4 flex flex-col gap-y-2">
            {omdbDetails?.Genre && <p><span className="font-semibold">Genre:</span> {omdbDetails.Genre}</p>}
            {omdbDetails?.imdbRating && <p><span className="font-semibold">Rating:</span> {omdbDetails.imdbRating}</p>}
            {omdbDetails?.Runtime && <p><span className="font-semibold">Runtime:</span> {omdbDetails.Runtime}</p>}
            {omdbDetails?.Language && <p><span className="font-semibold">Language:</span> {omdbDetails.Language}</p>}
            {omdbDetails?.Country && <p><span className="font-semibold">Country:</span> {omdbDetails.Country}</p>}
          </div>
          
          {omdbDetails?.Actors && <p className="mb-2"><span className="font-semibold">Actors:</span> {omdbDetails.Actors}</p>}
          
          {omdbDetails?.Writer && <p className="mb-2"><span className="font-semibold">Writer:</span> {omdbDetails.Writer}</p>}
          
          {omdbDetails?.Director && <p><span className="font-semibold">Director:</span> {omdbDetails.Director}</p>}

        </div>
        
        <div className="flex-1">
          {omdbDetails?.Poster &&<img 
            src={omdbDetails.Poster} 
            alt={episode?.title} 
            className="w-full h-auto rounded-lg shadow-lg"
            loading="lazy"
          />
          }
        </div>
      </div>
    </div>
  )
}

export default EpisodeDetails