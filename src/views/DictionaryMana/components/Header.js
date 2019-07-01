import React from 'react'

import OperationItem from './OperationItem'

import styles from './Header.module.less'

export default ({ name, list, onDelete }) => {
  return (
    <span className={styles.container}>
      <span className={styles.name}>{name}</span>
      {Array.isArray(list) &&
        list.map(({ text, code }) => (
          <OperationItem key={code} text={text} code={code} onDelete={() => onDelete(code)} />
        ))}
    </span>
  )
}
