import { FC } from 'react';
import { EpisodeType } from '../api/episodes/types';

const RightDrawer: FC<{ episode?: EpisodeType; isOpen: boolean; toggleDrawer: () => void }> = ({ episode, isOpen, toggleDrawer }) => {
  return (
    <div className="relative h-screen">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-4/12 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">{episode ? "Create" : "Update"} a new episode</h2>

          <label className="text-sm" htmlFor="title">title</label>
          <input id='title' name='title'
            placeholder='Title'
            className='w-full border p-2 mb-3'
          />

          <div className="flex justify-between gap-2 mb-3">
            <div className="flex-col">
              <label className="text-sm" htmlFor="episodeNumber">Episode number</label>
              <input id='episodeNumber' name='episodeNumber'
                placeholder='Episode number'
                className='w-full border p-2 mr-1'
                type='number'
              />
            </div>

            <div className="flex-col">
              <label className="text-sm" htmlFor="seasonNumber">Season number</label>
              <input id='seasonNumber' name='seasonNumber'
                placeholder='Season number'
                className='w-full border p-2 ml-1'
                type='number'
              />
            </div>
          </div>


          <label className="text-sm" htmlFor="imdbId">Imdb id</label>
          <input id='imdbId' name='imdbId'
            placeholder='IMDB Id'
            className='w-full border p-2 mb-3'
          />

          <label className="text-sm" htmlFor="description">Description</label>
          <textarea id='description' name='description'
            placeholder='Description'
            className='w-full border p-2 mb-3'
            rows={5}
          />

          <label className="text-sm" htmlFor='releaseDate'>Release Date</label>
          <input id='releaseDate' name='releaseDate' type="date" placeholder='Release date'  className='w-full border mb-3'/>
        
        </div>
      </div>
    </div>
  );
};

export default RightDrawer;
