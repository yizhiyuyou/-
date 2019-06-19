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
        <Column title="上报时间" dataIndex="createTime" key="createTime" align="center" />
        <Column title="能耗类型" dataIndex="typeText" key="typeText" align="center" />
        <Column title="所属区域" dataIndex="position" key="position" align="center" />
        <Column title="读表数据" dataIndex="meterNumber" key="meterNumber" align="center" />
        <Column title="用量" dataIndex="meterData" key="meterData" align="center" />
        <Column title="创建人" dataIndex="creator" key="creator" align="center" />
        <Column
          title="操作"
          key="action"
          align="center"
          render={row => {
            return (
              <span>
                <Button onClick={() => onEdit(row)} type="primary" className={styles['m-r-35']}>
                  编辑
                </Button>
                <Popconfirm
                  title="是否要删除该条信息?"
                  onConfirm={() => onDelete({ ids: [row.id] })}
                >
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
