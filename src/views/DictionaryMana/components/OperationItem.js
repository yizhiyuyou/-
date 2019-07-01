import React from 'react'

import { Icon } from 'antd'

import styles from './OperationItem.module.less'

const ICON_STYLE = {
  color: '#bfbfbf',
}

function stopPropagation(e) {
  e.stopPropagation()
}

export default ({ text, onDelete }) => {
  return (
    <span className={styles.container}>
      <span className={styles.content} onClick={stopPropagation}>
        {text}
        <Icon onClick={onDelete} type="close-circle" theme="filled" style={ICON_STYLE} />
      </span>
    </span>
  )
}
