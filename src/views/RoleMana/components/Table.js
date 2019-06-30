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
        <Column title="角色名称" dataIndex="roleName" key="roleName" align="center" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" align="center" />
        <Column title="所属部门" dataIndex="deptName" key="deptName" align="center" />
        <Column title="备注" dataIndex="remark" key="remark" align="center" />
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
                  title="是否要删除该条角色信息?"
                  onConfirm={() => onDelete({ id: row.id })}
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
