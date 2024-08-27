import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EpisodeType } from '../api/episodes/types';
import Button from "./button";
import Typography from "./typography";
import { useCreateEpisodeMutation, useUpdateEpisodeMutation } from "../api/episodes";
import uuid from "short-uuid";

const schema = z.object({
  id: z.string(),
  series: z.string().min(3),
  title: z.string().min(3),
  description: z.string().min(3),
  imdbId: z.string().min(9),
  episodeNumber: z.number().min(1),
  seasonNumber: z.number().min(1),
  releaseDate: z.string(),
});

type SchemaType = z.infer<typeof schema>


const defaultValues = {
  id: uuid().generate(),
  series: "",
  title: "",
  description: "",
  imdbId: "",
  episodeNumber: 0,
  seasonNumber: 0,
  releaseDate: "",
}

const RightDrawer: FC<{ episode?: EpisodeType; isOpen: boolean; toggleDrawer: () => void }> = ({ episode, isOpen, toggleDrawer }) => {
  const { register, formState: { errors }, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    values: isOpen ? episode :  defaultValues
  });
  const [createEpisode] = useCreateEpisodeMutation();
  const [updateEpisode] = useUpdateEpisodeMutation();
  

  const onSubmit = (data: SchemaType) => {
    if(episode) {
      updateEpisode(data as EpisodeType)
    }    
    createEpisode(data as EpisodeType);
  }

  return (
    <div className="relative h-screen">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <form
        className={`fixed top-0 right-0 w-4/12 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-4 h-full ">
          <h2 className="text-lg font-bold mb-4">{episode ? "Update " : "Create a new"} episode</h2>

          <label className="text-sm" htmlFor="series">series</label>
          <input id='series' 
            placeholder='series'
            className='w-full border p-2 mb-1'
            {...register('series')}
          />

          <label className="text-sm" htmlFor="title">title</label>
          <input id='title' 
            placeholder='Title'
            className='w-full border p-2 mb-1'
            {...register('title')}
          />
          {errors.title?.message && <Typography className="text-red-500 text-sm mt-0">{errors.title?.message}</Typography>}

          <div className="flex justify-between gap-2 mb-1">
            <div className="flex-col">
              <label className="text-sm" htmlFor="episodeNumber">Episode number</label>
              <input id='episodeNumber' 
                placeholder='Episode number'
                className='w-full border p-2 mr-1'
                type='number'
                min={0}
                {...register('episodeNumber',{
                  setValueAs: (value) => Number(value),
                })}
              />
              {errors.episodeNumber?.message && <Typography className="text-red-500 text-sm mt-0">{errors.episodeNumber?.message}</Typography>}
            </div>

            <div className="flex-col">
              <label className="text-sm" htmlFor="seasonNumber">Season number</label>
              <input id='seasonNumber' 
                placeholder='Season number'
                className='w-full border p-2 ml-1'
                type='number'
                min={0}
                {...register('seasonNumber', {
                  setValueAs: (value) => Number(value),
                })}
              />
              {errors.seasonNumber?.message && <Typography className="text-red-500 text-sm mt-0">{errors.seasonNumber?.message}</Typography>}
            </div>
          </div>


          <label className="text-sm" htmlFor="imdbId">Imdb id</label>
          <input id='imdbId'
            placeholder='IMDB Id'
            className='w-full border p-2 mb-1'
            {...register('imdbId')}
          />
          {errors.imdbId?.message && <Typography className="text-red-500 text-sm mt-0">{errors.imdbId?.message}</Typography>}

          <label className="text-sm" htmlFor="description">Description</label>
          <textarea id='description'
            placeholder='Description'
            className='w-full border p-2 mb-1'
            {...register('description')}
            rows={5}
          />
          {errors.description?.message && <Typography className="text-red-500 text-sm mt-0">{errors.description?.message}</Typography>}

          <label className="text-sm" htmlFor='releaseDate'>Release Date</label>
          <input id='releaseDate' type="date" placeholder='Release date'  className='w-full border mb-1'
          {...register('releaseDate')}/>
          {errors.releaseDate?.message && <Typography className="text-red-500 text-sm mt-0">{errors.releaseDate?.message}</Typography>}
          
          <div className="ml-auto w-fit mt-10">

            <Button variant="secondary" >Save episode</Button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default RightDrawer;
