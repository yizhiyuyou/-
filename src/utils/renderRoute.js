import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Authorized from '@/components/Authorized'

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

              if (route.component) {
                if (route.meta.authority) {
                  return (
                    <Authorized {...props}>
                      <route.component {...props}>{childRoutes}</route.component>
                    </Authorized>
                  )
                }

                return <route.component {...props}>{childRoutes}</route.component>
              } else {
                return childRoutes
              }
            }}
          />
        )
      })}
    </Switch>
  ) : null
}
