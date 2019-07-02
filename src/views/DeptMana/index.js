import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification, Button } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import Table from './components/Table'

import styles from './index.module.less'

export default ({ history }) => {
  const { DeptManaStore } = useContext(StoreContext)

  const { pagination, setPagination, getList, deleteItemById } = DeptManaStore

  const handleChange = useCallback(pagination => {
    setPagination(pagination)

    getList()
  }, [])

  const { setParams: handleDelete } = useFetch(deleteItemById, res => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '删除成功' })

      getList()
    } else {
      notification.error({ duration: 2, message: res.msg || '删除失败' })
    }
  })

  useEffect(() => {
    getList()
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  const pushRoute = useCallback(({ id = '' } = {}) => {
    history.push(`/systemMana/deptOperation/${id}`)
  }, [])

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>部门管理列表</span>
        <Button onClick={pushRoute} type="primary" size="large" icon="plus-circle">
          新增部门
        </Button>
      </div>
      <Table
        onEdit={pushRoute}
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={DeptManaStore.list}
        loading={DeptManaStore.isLoading}
        rowKey="id"
      />
    </div>
  ))
}
