import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { StoreContext } from '@/stores'

export const Authorized = (props) => {
  const store = useContext(StoreContext)

  return (
    <React.Fragment>
      {store.rootStore.loaded ? props.children : <Redirect to="/login"/>}
    </React.Fragment>
  )
}

export default Authorized