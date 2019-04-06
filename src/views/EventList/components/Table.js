import React, { useCallback } from 'react'

import { Table, Popconfirm } from 'antd'

import Button from '../../../components/Button'

import styles from './Table.module.less'

const { Column } = Table

export default ({ onLookDetail, onDelete, onChange, ...rest }) => {
  // 过滤掉一些多余数据
  const handleChange = useCallback((pagination) => {
    typeof onChange === 'function' && onChange(pagination)
  }, [onChange])

  return (
    <div className={styles['table-container']}>
      <Table {...rest} onChange={handleChange}>
        <Column
          title="事件编号"
          dataIndex="eventNum"
          key="eventNum"
          align="center"
        />
        <Column
          title="事件类型"
          dataIndex="eventTypeName"
          key="eventTypeName"
          align="center"
        />
        <Column
          title="创建人"
          dataIndex="creator"
          key="creator"
          align="center"
        />
        <Column
          title="当前操作人"
          dataIndex="monitor"
          key="monitor"
          align="center"
        />
        <Column
          title="当前状态"
          dataIndex="status"
          key="status"
          align="center"
        />
        <Column
          title="上报时间"
          dataIndex="createTime"
          key="createTime"
          align="center"
        />
        <Column
          title="操作"
          key="action"
          align="center"
          render={({ id }) => {
            return (
              <span>
                <Button
                  onClick={() => window.open(`/#/detail/event/${id}`, '_blank')}
                  type="primary"
                  className={styles['m-r-35']}
                >
                  查看详情
                </Button>
                <Popconfirm title="是否要删除该条事件?" onConfirm={() => onDelete({ id })}>
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