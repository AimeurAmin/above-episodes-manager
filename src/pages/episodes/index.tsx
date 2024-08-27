import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyGetOmdbEpisodeByIdQuery, useListEpisodesQuery } from "../../api/episodes";
import { EpisodeType } from "../../api/episodes/types";
import Button from "../../components/button";
import Card from "../../components/card";
import RightDrawer from "../../components/drawer";
import SearchInput from "../../components/search";
import useDebounce from "../../hooks/use-debounce";
import Typography from "../../components/typography";

const EpisodesList = () => {
  const { debouncedSearch, updateDebounce } = useDebounce<string>("");

  
  const { data, isLoading } = useListEpisodesQuery(debouncedSearch);

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
  const [episodeToUpdate, setEpisodeToUpdate] = useState<EpisodeType | undefined>(undefined);

  const handleOpenCreateDrawer = () => {
    setEpisodeToUpdate(undefined);
    setIsDrawerOpen(true);
  }

  const handleOpenUpdateDrawer = (episode: EpisodeType) => {
    setEpisodeToUpdate(episode);
    setIsDrawerOpen(true)
  }

  if(isLoading) {
    return (
      <div className="h-svh flex flex-colr items-center">
        <Typography className="text-primary-600 font-semibold text-lg">Loading list of episodes...</Typography>
      </div>
    )
  }

  if(!data?.data?.listEpisodes) {
    return (
      <div className="h-svh flex flex-colr items-center">
        <Typography className="text-red-600 font-semibold text-lg">No Episodes.</Typography>
      </div>
    )
  }
  
  const { data: { listEpisodes } } = data; 
  
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
        <Button variant="secondary" onClick={handleOpenCreateDrawer}>Create a new episode</Button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-400px)]">
        {listEpisodes.map((episode) => (
          <div className="mb-3" key={episode.id}>
            <Link to={`/${episode.id}`}>
              <Card {...episode} updateEpisode={handleOpenUpdateDrawer}  />
            </Link>
          </div>
        ))}
      </div>
    </div>,
    <RightDrawer isOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(prev => !prev)} episode={episodeToUpdate}/>
  ])
}

export default EpisodesList