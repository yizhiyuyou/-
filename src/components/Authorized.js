import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '@/stores'

export const Authorized = (props) => {
  const store = useContext(StoreContext)

  return useObserver(() =>
    <React.Fragment>
      { store.rootStore.loaded ? props.children : <Redirect to="/login"/> }
    </React.Fragment>
  )
}

export default Authorized