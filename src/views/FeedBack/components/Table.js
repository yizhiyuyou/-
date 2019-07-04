import React, { useCallback } from 'react'

import { Table } from 'antd'

import classnames from 'classnames'

import Button from '@/components/Button'

import styles from './Table.module.less'

const { Column } = Table

// 根据分页信息和改行index，获取改行序号
function getIndex(pagination, index) {
  if (!pagination) {
    return index + 1
  }

  const { current, pageSize } = pagination

  return (current - 1) * pageSize + index + 1
}

export default ({ onEdit, onChange, className, ...rest }) => {
  // 过滤掉一些多余数据
  const handleChange = useCallback(
    pagination => {
      typeof onChange === 'function' && onChange(pagination)
    },
    [onChange]
  )

  return (
    <div className={classnames(className, styles.container)}>
      <Table {...rest} onChange={handleChange}>
        <Column
          title="序号"
          key="num"
          align="center"
          render={(row, record, index) => getIndex(rest.pagination, index)}
        />
        <Column title="反馈时间" dataIndex="createTime" align="center" />
        <Column title="联系方式" dataIndex="createPhone" align="center" />
        <Column title="满意度" dataIndex="scoreText" align="center" />
        <Column title="反馈内容" dataIndex="content" align="center" />
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
