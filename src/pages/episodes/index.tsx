import { Link } from "react-router-dom";
import { useListEpisodesQuery } from "../../api/episodes";
import Button from "../../components/button";
import Typography from "../../components/typography";
import useDebounce from "../../hooks/use-debounce";

const EpisodesList = () => {
  const { debouncedSearch, updateDebounce } = useDebounce<string>("");

  const { data } = useListEpisodesQuery(debouncedSearch);

  
  if(!data?.data?.listEpisodes) return <>No episodes</>

  const { data: { listEpisodes } } = data

  return (
    <div>
        <input className="my-4" onChange={(e) => updateDebounce(e.target.value)} />
        <div className="flex-row space-x-3">
          <Button variant="secondary">Secondary button</Button>
        </div>
        <Typography className="text-xl font-bold">Primary</Typography>
        <Typography variant="secondary">Secondary</Typography>

        {listEpisodes.map((episode) => (
          <div>
            <Link to={`/${episode.id}`}>{episode.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default EpisodesList