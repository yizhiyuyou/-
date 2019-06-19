import React from 'react'

import dicStore from './dicStore'
import rootStore from './rootStore'
import myTaskStore from '@/views/MyTask/store'
import eventListStore from '@/views/EventList/store'
import EventDetailsStore from '@/views/EventDetails/store'
import SparePartStockStore from '@/views/SparePartStock/store'
import energyAnalysisStore from '@/views/EnergyAnalysis/store'
import EnergyDetailsStore from '@/views/EnergyDetails/store'

export const stores = {
  dicStore,
  rootStore,
  myTaskStore,
  eventListStore,
  EventDetailsStore,
  SparePartStockStore,
  energyAnalysisStore,
  EnergyDetailsStore,
}

export const StoreContext = React.createContext(stores)
