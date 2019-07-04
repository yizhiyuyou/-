import React, { useCallback } from 'react'

import { Table, Popconfirm } from 'antd'

import Button from '@/components/Button'

import styles from './Table.module.less'

const { Column } = Table

export default ({ onEdit, onLook, onDelete, onChange, ...rest }) => {
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
        <Column title="发布时间" dataIndex="createTime" align="center" />
        <Column title="标题" dataIndex="noticeTitle" align="center" />
        <Column title="发布单位" dataIndex="noticeSource" align="center" />
        <Column title="接收人" dataIndex="receive" align="center" />
        <Column title="发布人" dataIndex="creator" align="center" />
        <Column
          title="状态"
          key="status"
          align="center"
          render={({ noticeStateColor, noticeStateText }) => {
            return <span style={{ color: noticeStateColor }}>{noticeStateText}</span>
          }}
        />
        <Column
          title="操作"
          key="action"
          align="center"
          render={row => {
            return (
              <span>
                <Button
                  onClick={() => (row.noticeState === 1 ? onLook(row) : onEdit(row))}
                  type="primary"
                  className={styles['m-r-35']}
                >
                  {row.noticeState === 1 ? '查看详情' : '编辑'}
                </Button>
                <Popconfirm
                  title="是否要删除该条通知公告?"
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
