import React from 'react'

import dicStore from './dicStore'
import rootStore from './rootStore'
import eventListStore from '@/views/EventList/store'

export const stores = {
  dicStore,
  rootStore,
  eventListStore,
}

export const StoreContext = React.createContext(stores)
