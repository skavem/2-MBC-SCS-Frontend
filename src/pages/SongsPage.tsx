import React from "react";
import SearchField from "../components/search-field/SearchField";
import AddSongButton from "../components/pages/SongsPage/AddSongButton";
import CoupletModal from "../components/pages/SongsPage/CoupletModal";
import CoupletsList from "../components/pages/SongsPage/CoupletsList";
import ShowHideCoupletButton from "../components/pages/SongsPage/ShowHideCoupletButton";
import SongFavsList from "../components/pages/SongsPage/SongFavsList";
import SongsList from "../components/pages/SongsPage/SongsList";
import { WSSingletone } from "../websocket/wsSingletone";

const SongsPage = () => {
  return (
    <div className="flex flex-row h-full w-full p-6">
      <div className="flex flex-col w-1/3 h-full mr-2">
        <SearchField
          className="w-full mb-2"
          onSearch={(debounced) => {
            if (debounced.length > 0) WSSingletone.get().searchSong(debounced);
          }}
        />
        <div className="min-h-0 mb-2">
          <SongsList className="w-full h-full" />
        </div>
        <AddSongButton />
      </div>

      <div className="flex flex-col w-full">
        <CoupletsList className="w-full h-1/2 mb-2" />
        <ShowHideCoupletButton className="flex justify-center mb-2" />
        <SongFavsList className="min-h-0 grow" />
      </div>

      <CoupletModal />
    </div>
  );
};

export default SongsPage;
