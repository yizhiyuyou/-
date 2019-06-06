import React from 'react'

import dicStore from './dicStore'
import rootStore from './rootStore'
import eventListStore from '@/views/EventList/store'
import EventDetailsStore from '@/views/EventDetails/store'
import SparePartStockStore from '@/views/SparePartStock/store'

export const stores = {
  dicStore,
  rootStore,
  eventListStore,
  EventDetailsStore,
  SparePartStockStore,
}

export const StoreContext = React.createContext(stores)
