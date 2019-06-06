import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'

import styles from './index.module.less'

export default () => {
  const { dicStore, SparePartStockStore } = useContext(StoreContext)

  const {
    listCtd,
    search,
    setSearch,
    pagination,
    setPagination,
    getList,
    deleteEventById,
  } = SparePartStockStore

  const handleSubmit = useCallback(() => {
    setPagination({ current: 1 })

    getList()
  }, [])

  const handleChange = useCallback(pagination => {
    setPagination(pagination)

    getList()
  }, [])

  const { setParams: handleDelete } = useFetch(deleteEventById, res => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '删除成功' })

      getList()
    } else {
      notification.error({ duration: 2, message: res.msg || '删除失败' })
    }
  })

  useEffect(() => {
    dicStore.getDictionaryByType('sparepartType')

    getList()
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  return useObserver(() => (
    <div className={styles['event-list']}>
      <WrappedSearchForm value={search} onChange={setSearch} onSubmit={handleSubmit} />
      <div className={styles.title}>备件库存</div>
      <Table
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={listCtd}
        loading={SparePartStockStore.isLoading}
        rowKey="id"
      />
    </div>
  ))
}
