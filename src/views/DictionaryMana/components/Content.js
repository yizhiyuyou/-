import React from 'react'

import OperationItem from './OperationItem'

import styles from './Content.module.less'

export default ({ list, onDelete }) => {
  return (
    Array.isArray(list) &&
    list.map((item, index) => (
      <div className={styles.container} key={index}>
        {item.map(({ text, code }) => (
          <OperationItem key={code} text={text} code={code} onDelete={() => onDelete(code)} />
        ))}
      </div>
    ))
  )
}
