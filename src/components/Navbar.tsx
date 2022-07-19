import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import appPages from '../variables/pages'

const Navbar = () => {
  const curLoc = useLocation()

  return (
    <nav
      className='flex row justify-center 
    items-center bg-gray-500 text-white'
    >
      <h1
        className='ml-4 mr-4 font-bold text-xl'
      >
        2 MBC Stream Control Studio
      </h1>
      <div className="flex grow justify-center">
        {appPages.map(page => (
          <Link
            to={page.path}
            key={page.name}
            className={
              'flex p-3 m-1 transition-colors rounded-lg '
              + 'border-transparent border-2 '
              + (curLoc.pathname === page.path ?
                'border-white bg-gray-600' :
                'hover:border-white hover:bg-gray-600')
            }
          >
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar