import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { Context } from '../utils/userInfoContext'

export default (props) => {
  const { globalData: { loaded } } = useContext(Context)

  return (
    <React.Fragment>
      {loaded ? props.children : <Redirect to="/login"/>}
    </React.Fragment>
  )
}