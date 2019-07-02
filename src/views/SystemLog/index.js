import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'

import styles from './index.module.less'

export default () => {
  const { SystemLogStore } = useContext(StoreContext)

  const { setSearch, pagination, setPagination, getList } = SystemLogStore

  const handleSubmit = useCallback(() => {
    setPagination({ current: 1 })

    getList()
  }, [])

  const handleChange = useCallback(pagination => {
    setPagination(pagination)

    getList()
  }, [])

  useEffect(() => {
    getList()
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  return useObserver(() => (
    <div className={styles.container}>
      <WrappedSearchForm
        value={SystemLogStore.search}
        onChange={setSearch}
        onSubmit={handleSubmit}
      />
      <div className={styles.title}>
        <span>备件库存</span>
      </div>
      <Table
        onChange={handleChange}
        pagination={pagin}
        dataSource={SystemLogStore.list}
        loading={SystemLogStore.isLoading}
        rowKey="id"
      />
    </div>
  ))
}
