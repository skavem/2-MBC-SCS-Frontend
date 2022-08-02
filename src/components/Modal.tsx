import { XIcon } from '@heroicons/react/solid'
import React from 'react'

interface IModal {
  onClose: () => void
  name: string
  shown: boolean
  children?: React.ReactNode
}

const Modal = ({ onClose, name, shown, children }: IModal) => {
  return (
    <div
      className={`fixed z-10 left-0 top-0 w-full h-full bg-gray-700 
      bg-opacity-70 flex items-center justify-center transition-all 
      ${shown ? 'opacity-100 visible ' : 'opacity-0 invisible '}`}
      onClick={onClose}
    >
      <div
        className='w-1/2 max-w-[720px] max-h-[630px] 
      bg-white rounded-2xl flex flex-col text-gray-700'
        onClick={e => e.stopPropagation()}
      >
        <div
          className='flex justify-between h-fit w-full text-black p-3 pb-2 border-b-2
          border-gray-300'
        >
          <p className='text-xl text-gray-500 font-semibold'>{name}</p>
          <div
            className='border-2 rounded-full hover:bg-gray-500 
            border-transparent p-1 cursor-pointer transition-colors group'
            onClick={onClose}
          >
            <XIcon className='h-5 fill-gray-700 group-hover:fill-white' />
          </div>
        </div>

        {children}

      </div>
    </div>
  )
}

Modal.Buttons = ({ children }: { children: React.ReactNode }) => (
  <div className='flex flex-row align-center justify-end p-3'>
    {children}
  </div>
)

Modal.Contents = ({ children }: { children: React.ReactNode }) => (
  <div
    className="p-4 items-center justify-center overflow-y-auto 
    min-h-[100px] border-b-2 border-gray-300 w-full"
  >
    {children}
  </div>
)

export default Modal