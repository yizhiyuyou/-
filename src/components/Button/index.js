import React from 'react'

import styles from './index.module.less'

export default ({ type, children, className, ...rest }) => {
  const cn = type === 'primary' ? styles['text-button_primary'] : styles['text-button_danger']

  return (
    <span className={className}>
      <span className={cn} {...rest}>
        {children}
      </span>
    </span>
  )
}
