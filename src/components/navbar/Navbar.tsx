import React, { useCallback, useEffect } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { settingsSlice } from '../../store/slices/settingsSlice'
import appPages from '../../variables/pages'
import SettingsButton from './SettingsButton'
import SettingsModal from './SettingsModal'

const Navbar = () => {
  const curLoc = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const keyHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const curPageInd = appPages.findIndex(
        page => page.path === curLoc.pathname
      )
      const nextPageInd = curPageInd + 1 < appPages.length ?
        curPageInd + 1 :
        0
      navigate(appPages[nextPageInd].path)
    }
  }, [curLoc, navigate])

  useEffect(() => {
    document.addEventListener('keyup', keyHandler)

    return () => {
      document.removeEventListener('keyup', keyHandler)
    }
  }, [keyHandler])

  return (
    <nav
      className='flex row justify-center 
      items-center bg-gray-500 text-white'
    >
      <h1
        className='ml-4 mr-4 font-bold text-xl'
      >
        SC Studio
      </h1>
      <div className="flex grow justify-center">
        {appPages.map(page => (
          <Link
            to={page.path}
            key={page.name}
            className={
              'flex p-3 m-1 transition-colors rounded-lg '
              + 'border-transparent border-2 '
              + ((curLoc.pathname === page.path) ||
                (page.default && (curLoc.pathname === '/')) ?
                'border-white bg-gray-600' :
                'hover:border-white hover:bg-gray-600')
            }
          >
            {page.name}
          </Link>
        ))}
      </div>
      <SettingsButton
        onClick={() => dispatch(settingsSlice.actions.setModalShown(true))}
      />
      <SettingsModal />
    </nav>
  )
}

export default Navbar