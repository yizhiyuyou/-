import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { withMetaProvider } from '@/utils/MetaContext'

import Authorized from '@/components/Authorized'

import { withWaiting } from '@/components/PageLoading'

const RouteWithProps = ({ path, exact, strict, render, location, sensitive, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    sensitive={sensitive}
    render={props => render({ ...props, ...rest })}
  />
)

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
          <RouteWithProps
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={props => {
              const childRoutes = renderRoutes(route.children)

              const Component = withMetaProvider(withWaiting(route.component))

              if (route.meta.authority) {
                return (
                  <Authorized {...props} meta={route.meta}>
                    <Component {...props} meta={route.meta} children={childRoutes} />
                  </Authorized>
                )
              }

              return <Component {...props} meta={route.meta} children={childRoutes} />
            }}
          />
        )
      })}
    </Switch>
  ) : null
}
