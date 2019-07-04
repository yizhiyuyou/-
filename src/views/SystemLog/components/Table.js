import React, { useCallback } from 'react'

import { Table } from 'antd'

import styles from './Table.module.less'

const { Column } = Table

export default ({ onEdit, onDelete, onChange, ...rest }) => {
  // 过滤掉一些多余数据
  const handleChange = useCallback(
    pagination => {
      typeof onChange === 'function' && onChange(pagination)
    },
    [onChange]
  )

  return (
    <div className={styles['table-container']}>
      <Table {...rest} onChange={handleChange}>
        <Column title="用户名" dataIndex="username" align="center" />
        <Column title="用户操作" dataIndex="operation" align="center" />
        <Column title="IP地址" dataIndex="ip" align="center" />
        <Column title="创建时间" dataIndex="createDate" align="center" />
      </Table>
    </div>
  )
}
