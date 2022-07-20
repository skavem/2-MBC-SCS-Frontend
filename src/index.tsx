import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import { store } from './store'
import App from './App'
import { WSSingletone } from './websocket/wsSingletone'
import { WSIPDefault, WSPortDefault } from './variables/websocket'

const container = document.getElementById('root')!
const root = createRoot(container)

const ws = WSSingletone.create(WSIPDefault, WSPortDefault)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);