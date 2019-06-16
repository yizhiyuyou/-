import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MetaContext, { defaultMeta } from '@/utils/MetaContext'

import Authorized from '@/components/Authorized'

import PageLoading from '@/components/PageLoading'

export default function renderRoutes(routes) {
  return routes ? (
    <Switch>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          )
        }

        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={props => {
              const childRoutes = renderRoutes(route.children)

              if (route.meta.authority) {
                return (
                  <Suspense fallback={<PageLoading />}>
                    <MetaContext.Provider value={route.meta || defaultMeta}>
                      <Authorized {...props}>
                        <route.component {...props} children={childRoutes} />
                      </Authorized>
                    </MetaContext.Provider>
                  </Suspense>
                )
              }

              return (
                <Suspense fallback={<PageLoading />}>
                  <MetaContext.Provider value={route.meta || defaultMeta}>
                    <route.component {...props} children={childRoutes} />
                  </MetaContext.Provider>
                </Suspense>
              )
            }}
          />
        )
      })}
    </Switch>
  ) : null
}
