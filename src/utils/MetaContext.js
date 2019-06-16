import React from 'react'

export const defaultMeta = {
  hasRoute() {},
  has() {},
}

const context = React.createContext(defaultMeta)

export function withMetaProvider(WrappedComponent) {
  return ({ meta, ...rest }) => (
    <context.Provider value={meta || defaultMeta} children={<WrappedComponent {...rest} />} />
  )
}

export default context
