import React from 'react'

import dicStore from './dicStore'
import rootStore from './rootStore'
import myTaskStore from '@/views/MyTask/store'
import eventListStore from '@/views/EventList/store'
import EventDetailsStore from '@/views/EventDetails/store'
import SparePartStockStore from '@/views/SparePartStock/store'
import energyAnalysisStore from '@/views/EnergyAnalysis/store'
import EnergyDetailsStore from '@/views/EnergyDetails/store'
import HomePageStore from '@/views/HomePage/store'
import UserManaStore from '@/views/UserMana/store'
import DeptManaStore from '@/views/DeptMana/store'
import RoleManaStore from '@/views/RoleMana/store'
import DictionaryManaStore from '@/views/DictionaryMana/store'
import SystemLogStore from '@/views/SystemLog/store'
import NoticeListStore from '@/views/NoticeList/store'

export const stores = {
  dicStore,
  rootStore,
  myTaskStore,
  eventListStore,
  EventDetailsStore,
  SparePartStockStore,
  energyAnalysisStore,
  EnergyDetailsStore,
  HomePageStore,
  UserManaStore,
  DeptManaStore,
  RoleManaStore,
  DictionaryManaStore,
  SystemLogStore,
  NoticeListStore,
}

export const StoreContext = React.createContext(stores)
