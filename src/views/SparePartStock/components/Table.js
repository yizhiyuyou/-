import React, { useCallback } from 'react'

import { Table, Popconfirm } from 'antd'

import Button from '@/components/Button'

import history from '@/utils/history'

import styles from './Table.module.less'

const { Column } = Table

export default ({ onLookDetail, onDelete, onChange, ...rest }) => {
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
        <Column title="事件编号" dataIndex="eventNum" key="eventNum" align="center" />
        <Column title="事件类型" dataIndex="eventTypeText" key="eventTypeText" align="center" />
        <Column title="创建人" dataIndex="creator" key="creator" align="center" />
        <Column title="当前操作人" dataIndex="handler" key="handler" align="center" />
        <Column
          title="当前状态"
          key="state"
          align="center"
          render={({ color, stateText }) => <span style={{ color }}>{stateText}</span>}
        />
        <Column title="上报时间" dataIndex="createTime" key="createTime" align="center" />
        <Column
          title="操作"
          key="action"
          align="center"
          render={({ id }) => {
            return (
              <span>
                <Button
                  onClick={() => window.open(`/detail/event/${id}`, '_blank')}
                  // onClick={() =>
                  //   history.push({
                  //     pathname: `/detail/event/${id}`,
                  //     search: '?a=1&b=2',
                  //     state: {
                  //       h: 1,
                  //       c: 2,
                  //     },
                  //   })
                  // }
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
