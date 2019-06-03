import React from 'react'

const val = {
  hasRoute() {},
  has() {},
}

const context = React.createContext(val)

export function withMetaProvider(WrappedComponent) {
  return ({ meta, ...rest }) => (
    <context.Provider value={meta || val} children={<WrappedComponent {...rest} />} />
  )
}

export default context
