import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import BiblePage from './pages/BiblePage'
import SongsPage from './pages/SongsPage'

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className='flex h-full'>
          <Routes>
            <Route path='/' element={<BiblePage />} />
            <Route path='/Bible' element={<BiblePage />} />
            <Route path='/Songs' element={<SongsPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
