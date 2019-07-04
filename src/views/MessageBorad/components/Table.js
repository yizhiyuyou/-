import React, { useCallback } from 'react'

import { Table } from 'antd'

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
        <Column title="微信昵称" dataIndex="nickname" align="center" />
        <Column title="创建时间" dataIndex="createTime" align="center" />
        <Column title="所属地区" dataIndex="city" align="center" />
        <Column title="留言内容" dataIndex="content" align="center" />
        <Column
          title="操作"
          key="action"
          align="center"
          render={row => {
            return (
              <span>
                <Button onClick={() => onEdit(row)} type="primary" className={styles['m-r-35']}>
                  查看详情
                </Button>
              </span>
            )
          }}
        />
      </Table>
    </div>
  )
}
