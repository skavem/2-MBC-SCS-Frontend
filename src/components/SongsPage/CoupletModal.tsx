import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  clearCoupletModal,
  setCoupletModalFullName,
  setCoupletModalMark
} from '../../store/actions/SongsPage/coupletModalActions'
import { WSSingletone } from '../../websocket/wsSingletone'
import Modal from '../Modal'

const CoupletModal = () => {
  const dispatch = useAppDispatch()

  const {
    mark, fullName, insertAfter, edit
  } = useAppSelector(state => state.coupletModal)

  const song = useAppSelector(state => state.songs.active)

  const isShown = useAppSelector(state => state.coupletModal.modalShown)

  const onSave = useCallback(
    () => {
      if (insertAfter !== null) {
        WSSingletone.get().insertCouplet({
          fullName,
          mark,
          insert_after: insertAfter,
          song_id: song?.id!
        })
      } else if (edit !== null) {
        WSSingletone.get().editCouplet({
          fullName, mark, id: edit
        })
      }
      dispatch(clearCoupletModal())
    }, [fullName, mark, insertAfter, song, dispatch, edit]
  )


  return (
    <Modal
      name='Куплет'
      onClose={() => dispatch(clearCoupletModal())}
      shown={isShown}
    >
      <Modal.Contents>
        <div className="p-2 flex flex-col py-0">
          <label className='text-gray-700 font-semibold text'>Метка</label>
          <div className='flex items-center mb-2'>
            <input
              className='border-2 border-gray-300 w-full
              rounded-l-lg px-3 py-2 border-r-0'
              value={mark}
              onChange={e => dispatch(setCoupletModalMark(e.target.value))}
            />
            <button
              className='border-gray-300 border-2 p-2 border-r-0
              hover:border-gray-500 hover:bg-gray-500 hover:text-white'
              onClick={() => dispatch(setCoupletModalMark('Припев'))}
            >
              Припев
            </button>
            <button
              className='border-gray-300 border-2 p-2 rounded-r-lg
              hover:border-gray-500 hover:bg-gray-500 hover:text-white'
              onClick={() => dispatch(setCoupletModalMark('Куплет'))}
            >
              Куплет
            </button>
          </div>
          <label className='text-gray-700 font-semibold text'>
            Куплет
          </label>
          <textarea
            className='border-2 border-gray-300 w-full
            rounded-lg mb-2 px-3 py-2 custom-scrollbar'
            rows={7}
            value={fullName}
            onChange={e => dispatch(setCoupletModalFullName(e.target.value))}
          />
        </div>
      </Modal.Contents>
      <Modal.Buttons>
        <div
          className='bg-teal-500 rounded-lg p-2 text-white 
            cursor-pointer hover:bg-teal-700 transition-colors mr-2'
          onClick={onSave}
        >
          Сохранить
        </div>
        <div
          className='bg-gray-500 rounded-lg p-2 text-white 
            cursor-pointer hover:bg-gray-700 transition-colors'
          onClick={
            () => dispatch(clearCoupletModal())
          }
        >
          Отменить
        </div>
      </Modal.Buttons>
    </Modal>
  )
}

export default CoupletModal