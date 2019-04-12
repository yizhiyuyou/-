import React from 'react'
import rootStore from './root'

export const stores = {
  rootStore,
}

export const StoreContext = React.createContext(stores)
