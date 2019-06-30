import React, { useCallback } from 'react'

import { Table, Popconfirm } from 'antd'

import Button from '@/components/Button'

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
        <Column title="部门名称" dataIndex="name" key="name" align="center" />
        <Column title="上级部门" dataIndex="parentName" key="parentName" align="center" />
        <Column title="排序号" dataIndex="orderNum" key="orderNum" align="center" />
        <Column
          title="操作"
          key="action"
          align="center"
          render={({ id }) => {
            return (
              <span>
                <Button onClick={() => onEdit({ id })} type="primary" className={styles['m-r-35']}>
                  编辑
                </Button>
                <Popconfirm title="是否要删除该条部门信息?" onConfirm={() => onDelete({ id })}>
                  <Button type="danger">删除</Button>
                </Popconfirm>
              </span>
            )
          }}
        />
      </Table>
    </div>
  )
}
