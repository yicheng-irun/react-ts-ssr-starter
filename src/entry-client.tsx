import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRouter } from './create-router.tsx'
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'


async function render() {

  const { routes } = createRouter();

  const lazyMatches = matchRoutes(
    routes,
    window.location
  )?.filter((m) => m.route.lazy);
  
  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const routeModule = await m.route.lazy();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined,
        });
      })
    );
  }

  const router = createBrowserRouter(routes, {
    basename: '/',
  });


  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App>
        <RouterProvider router={router}  />
      </App>
    </React.StrictMode>,
  )
}

render().catch(console.error)