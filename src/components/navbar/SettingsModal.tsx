import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useInput } from '../../hooks/useInput'
import { settingsSlice } from '../../store/slices/settingsSlice'
import { WSIPDefault, WSPortDefault } from '../../variables/websocket'
import { WSSingletone } from '../../websocket/wsSingletone'
import Modal from '../Modal'

const SettingsModal = () => {
  const shown = useAppSelector(state => state.settings.modalShown)
  const dispatch = useAppDispatch()
  const { input: ip } = useInput(WSIPDefault)
  const { input: port } = useInput(WSPortDefault)

  return (
    <Modal
      onClose={() => dispatch(settingsSlice.actions.setModalShown(false))}
      name='Настройки'
      shown={shown}
    >
      <Modal.Contents>
        <div className='p-2 w-full flex'>
          <label
            className='flex items-center px-4 border-2 border-gray-300
            rounded-lg rounded-r-none'
          >
            IP:
          </label>
          <input
            className='p-2 border-2 border-gray-300 rounded-lg border-l-0
            rounded-l-none w-full'
            {...ip}
          />
        </div>
        <div className='p-2 pt-0 w-full flex'>
          <label
            className='flex items-center px-4 border-2 border-gray-300
            rounded-lg rounded-r-none'
          >
            PORT:
          </label>
          <input
            className='p-2 border-2 border-gray-300 rounded-lg border-l-0
            rounded-l-none w-full'
            {...port}
          />
        </div>
      </Modal.Contents>
      <Modal.Buttons>
        <div
          className='bg-teal-500 rounded-lg p-2 text-white 
          cursor-pointer hover:bg-teal-700 transition-colors mr-2'
          onClick={
            () => {
              WSSingletone.get().establishConnection(ip.value, port.value)
              dispatch(settingsSlice.actions.setModalShown(false))
            }
          }
        >
          Сохранить
        </div>
        <div
          className='bg-gray-500 rounded-lg p-2 text-white 
          cursor-pointer hover:bg-gray-700 transition-colors'
          onClick={
            () => dispatch(settingsSlice.actions.setModalShown(false))
          }
        >
          Отменить
        </div>
      </Modal.Buttons>
    </Modal>
  )
}

export default SettingsModal