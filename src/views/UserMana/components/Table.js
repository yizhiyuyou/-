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
        <Column title="真实姓名" dataIndex="realname" key="realname" align="center" />
        <Column title="用户名" dataIndex="username" key="username" align="center" />
        <Column title="所属部门" dataIndex="deptName" key="deptName" align="center" />
        <Column title="手机号" dataIndex="mobile" key="mobile" align="center" />
        <Column
          title="状态"
          key="status"
          align="center"
          render={({ statusColor, statusText }) => {
            return <span style={{ color: statusColor }}>{statusText}</span>
          }}
        />
        <Column title="创建时间" dataIndex="createTime" key="createTime" align="center" />
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
                <Popconfirm title="是否要删除该条用户信息?" onConfirm={() => onDelete({ id })}>
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
