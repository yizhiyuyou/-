import React from 'react'

import dicStore from './dicStore'
import rootStore from './rootStore'
import eventListStore from '@/views/EventList/store'
import EventDetailsStore from '@/views/EventDetails/store'

export const stores = {
  dicStore,
  rootStore,
  eventListStore,
  EventDetailsStore,
}

export const StoreContext = React.createContext(stores)
