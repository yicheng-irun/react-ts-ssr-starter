import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createRouter } from './create-router.tsx'
import { RouterProvider } from 'react-router-dom'


function render() {

  const { router } = createRouter();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App>
        <RouterProvider router={router}  />
      </App>
    </React.StrictMode>,
  )
}

render();