import React from 'react'

import rootStore from './rootStore'
import eventListStore from '@/views/EventList/store'

export const stores = {
  rootStore,
  eventListStore,
}

export const StoreContext = React.createContext(stores)
