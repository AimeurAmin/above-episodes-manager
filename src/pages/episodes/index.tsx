import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyGetOmdbEpisodeByIdQuery, useListEpisodesQuery, useOnCreateEpisodeQuery } from "../../api/episodes";
import Button from "../../components/button";
import Card from "../../components/card";
import SearchInput from "../../components/search";
import Typography from "../../components/typography";
import useDebounce from "../../hooks/use-debounce";
import RightDrawer from "../../components/drawer";

const EpisodesList = () => {
  const { debouncedSearch, updateDebounce } = useDebounce<string>("");

  const { data: createdEpisodes } = useOnCreateEpisodeQuery();
  
  const { data } = useListEpisodesQuery(debouncedSearch);

  const [triggerGetImdbData, { data: imdbData }] = useLazyGetOmdbEpisodeByIdQuery();

  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (data && data.data.listEpisodes.length > 0) {
      const updateImdbId = async () => {
        await triggerGetImdbData(data.data.listEpisodes[indexRef.current].imdbId);
        indexRef.current = (indexRef.current + 1) % data.data.listEpisodes.length;
        // Set the next timeout
        timeoutRef.current = setTimeout(updateImdbId, 5000);
      };

      // Start the interval-like behavior
      updateImdbId();

      return () => {
        // Clean up the timeout on component unmount
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [data]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if(!data?.data?.listEpisodes) return <>No episodes</>
  
  const { data: { listEpisodes } } = data;
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
 
  
  return ([
    <div className="w-6/12">
      <SearchInput onChange={(e) => updateDebounce(e.target.value)}/>

      {imdbData?.Poster &&
        <img 
        className="rounded-xl object-cover h-[250px] w-full my-3"
        src={imdbData.Poster}
        loading="lazy"
      />}
      <div className="ml-auto w-fit mb-2">
        <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>Create a new episode</Button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-350px)]">
        {listEpisodes.map((episode) => (
          <div className="mb-3">
            <Link to={`/${episode.id}`}>
              <Card {...episode}/>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex-row space-x-3">
        <Button variant="secondary">Secondary button</Button>
      </div>
      <Typography className="text-xl font-bold">Primary</Typography>
      <Typography variant="secondary">Secondary</Typography>

      
    </div>,
    <RightDrawer isOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(prev => !prev)}/>
  ])
}

export default EpisodesList