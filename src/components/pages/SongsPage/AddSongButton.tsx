import React, { useState } from "react";

import { PlusIcon } from "@heroicons/react/solid";
import AddSongModal from "./AddSongModal";

const AddSongButton = () => {
  const [modalShown, setModalShown] = useState(false);
  return (
    <>
      <button
        onClick={(e) => setModalShown(true)}
        className="border-2 border-gray-400 rounded-lg cursor-pointer
        hover:text-white hover:bg-gray-500 hover:border-transparent
        transition-all p-1 text-gray-700"
      >
        Добавить песню <PlusIcon className="h-4 inline-block" />
      </button>
      <AddSongModal shown={modalShown} onClose={() => setModalShown(false)} />
    </>
  );
};

export default AddSongButton;
