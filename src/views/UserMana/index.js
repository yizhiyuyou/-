import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification, Button } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'

import styles from './index.module.less'

export default ({ history }) => {
  const { UserManaStore } = useContext(StoreContext)

  const { setSearch, pagination, setPagination, getList, deleteItemById } = UserManaStore

  const handleSubmit = useCallback(() => {
    setPagination({ current: 1 })

    getList()
  }, [])

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
    history.push(`/systemMana/userAdd/${id}`)
  }, [])

  return useObserver(() => (
    <div className={styles['spare-part-stock']}>
      <WrappedSearchForm
        value={UserManaStore.search}
        onChange={setSearch}
        onSubmit={handleSubmit}
      />
      <div className={styles.title}>
        <span>用户管理列表</span>
        <Button onClick={pushRoute} type="primary" size="large" icon="plus-circle">
          新增用户
        </Button>
      </div>
      <Table
        onEdit={pushRoute}
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={UserManaStore.list}
        loading={UserManaStore.isLoading}
        rowKey="id"
      />
    </div>
  ))
}
