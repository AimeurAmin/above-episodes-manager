import { useParams } from "react-router-dom"
import { useGetEpisodeByIdQuery, useGetOmdbEpisodeByIdQuery } from "../../api/episodes";
import Typography from "../../components/typography";

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
  

  
  return (
    <div className="flex flex-col items-center">
      <Typography className="text-center text-primary-900 text-2xl w-[90%] font-bold text-ellipsis overflow-hidden text-nowrap mb-10">Stranger things things things things</Typography>
      <div className="bg-purple-100 p-4 flex">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-bold mb-2">Episode 1 - Chapter One: MADMAX</h2>
          <h3 className="text-lg font-semibold mb-4">Season 1</h3>
          
          <p className="mb-4">As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.</p>
          
          <div className="mb-4">
            <p><span className="font-semibold">Genre:</span> Drama, Fantasy, Horror</p>
            <p><span className="font-semibold">Runtime:</span> 48mn</p>
            <p><span className="font-semibold">Language:</span> English</p>
            <p><span className="font-semibold">Country:</span> United States</p>
          </div>
          
          <p className="mb-2"><span className="font-semibold">Actors:</span> Winona Ryder, David Harbour, Finn Wolfhard</p>
          
          <p className="mb-2"><span className="font-semibold">Writer:</span> Matt Duffer, Ross Duffer, Jessie Nickson-Lopez</p>
          
          <p><span className="font-semibold">Director:</span> Matt Duffer, Ross Duffer</p>
        </div>
        
        <div className="flex-1">
          {omdbDetails?.Poster &&<img 
            src={omdbDetails.Poster} 
            alt="Stranger Things Poster" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          }
        </div>
      </div>
    </div>
    // <div className="flex-row w-full h-full">
     
      
      
    //   <div>
    //   {id} - {JSON.stringify(data)} 
    //   <div>{data?.imdbId} - {JSON.stringify(omdbDetails)}

    //   </div>

    //   {omdbDetails?.Poster && <img src={omdbDetails.Poster} className="object-fill  h-6/12"  />}
    //   </div>
    // </div>
  )
}

export default EpisodeDetails