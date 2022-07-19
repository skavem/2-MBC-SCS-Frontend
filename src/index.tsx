import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import { store } from './store'
import App from './App'
import { WSSingletone } from './websocket/wsSingletone'

const container = document.getElementById('root')!
const root = createRoot(container)

const ws = WSSingletone.create('192.168.1.100', '8765')

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);