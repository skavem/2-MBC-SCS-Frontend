import React, { useCallback } from "react";
import { useInput } from "../../hooks/useInput";
import { WSSingletone } from "../../websocket/wsSingletone";
import Modal from "../Modal";

const AddSongModal = ({
  shown = false,
  onClose,
}: {
  shown: boolean;
  onClose: () => void;
}) => {
  const { input: mark } = useInput();
  const { input: fullName } = useInput();

  const onSave = useCallback(() => {
    WSSingletone.get().createSong({
      mark: +mark.value,
      name: fullName.value,
    });
    onClose();
  }, [mark, fullName, onClose]);

  return (
    <Modal name="Добавить песню" shown={shown} onClose={onClose}>
      <Modal.Contents>
        <div className="p-2 flex flex-col py-0">
          <label className="text-gray-700 font-semibold text">Метка</label>
          <div className="flex items-center mb-2">
            <input
              type={"number"}
              className="border-2 border-gray-300 w-full
              rounded-lg px-3 py-2"
              {...mark}
            />
          </div>
          <label className="text-gray-700 font-semibold text">Название</label>
          <input
            className="border-2 border-gray-300 w-full
            rounded-lg mb-2 px-3 py-2"
            {...fullName}
          />
        </div>
      </Modal.Contents>
      <Modal.Buttons>
        <div
          className="bg-teal-500 rounded-lg p-2 text-white 
          cursor-pointer hover:bg-teal-700 transition-colors mr-2"
          onClick={onSave}
        >
          Сохранить
        </div>
        <div
          className="bg-gray-500 rounded-lg p-2 text-white 
          cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={onClose}
        >
          Отменить
        </div>
      </Modal.Buttons>
    </Modal>
  );
};

export default AddSongModal;
