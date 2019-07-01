import React, { useCallback } from 'react'

import styles from './AddBtn.module.less'

export default ({ text = '添加', onClick }) => {
  const handleClick = useCallback(
    e => {
      e.stopPropagation()

      onClick()
    },
    [onClick]
  )

  return (
    <span className={styles.container} onClick={handleClick}>
      {text}
    </span>
  )
}
