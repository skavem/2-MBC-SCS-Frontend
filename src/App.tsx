import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import NotificationContainer from './components/notifications/NotificationContainer'
import { useAppSelector } from './hooks/redux'
import BiblePage from './pages/BiblePage'
import LoadingPage from './pages/LoadingPage'
import SongsPage from './pages/SongsPage'
import { WebSocketState } from './websocket/wsWrapper'

function App() {
  const isConnected = useAppSelector(
    state => state.websocket.state
  ) === WebSocketState.OPEN

  return (
    <BrowserRouter>
      <div className='flex flex-col h-full'>
        <Navbar />
        <div className='flex h-full relative'>
          {isConnected ?
            <Routes>
              <Route path='/' element={<BiblePage />} />
              <Route path='/Bible' element={<BiblePage />} />
              <Route path='/Songs' element={<SongsPage />} />
            </Routes> :
            <LoadingPage />
          }
          <NotificationContainer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
