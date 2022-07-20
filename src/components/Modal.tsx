import { XIcon } from '@heroicons/react/solid'
import React from 'react'

interface IModal {
  onClose: () => void
  name: string
  shown: boolean
  children?: React.ReactNode
  buttons?: React.ReactNode
}

const Modal = ({ onClose, name, shown, children, buttons }: IModal) => {
  return (
    <div
      className={`fixed z-10 left-0 top-0 w-full h-full bg-gray-700 
      bg-opacity-70 flex items-center justify-center transition-all 
      ${shown ? 'opacity-100 visible ' : 'opacity-0 invisible '}`}
    >
      <div
        className='w-1/2 max-w-[720px] max-h-[420px] 
      bg-white rounded-2xl flex flex-col text-gray-700'
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

        <div
          className="overflow-y-auto min-h-[100px] border-b-2 
          border-gray-300 w-full"
        >
          {children}
        </div>

        <div className='flex flex-row align-center justify-end p-3'>
          {buttons}
        </div>
      </div>
    </div>
  )
}

export default Modal