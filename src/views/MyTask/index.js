import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'

import styles from './index.module.less'

export default () => {
  const store = useContext(StoreContext)

  const [searchForm, setSearchForm] = useState({
    timePicker: [],
    type: '',
    state: '',
  })

  const [pagination, setPagination] = useState({
    // 当前页
    current: 1,
    // 一夜多少
    pageSize: 10,
    // 总个数
    total: 0,
  })

  const params = useMemo(() => {
    const { current: pageIndex, pageSize } = pagination

    return { ...searchForm, pageIndex, pageSize }
  }, [searchForm, pagination.current])

  const { isLoading } = useFetch(
    store.myTaskStore.getList,
    res => {
      if (res.code === 0) {
        // 纠正分页信息（增加修改total或者减少修改current）
        const { total, pageCount } = res

        const pagination = { total, current: params.pageIndex }

        if (pageCount !== 0 && params.pageIndex > pageCount) {
          Object.assign(pagination, { current: pageCount })
        }

        setPagination(state => ({
          ...state,
          ...pagination,
        }))
      }
    },
    [],
    params
  )

  const handleSubmit = useCallback(searchData => {
    setSearchForm(searchData)

    setPagination(state => ({ ...state, current: 1 }))
  }, [])

  useEffect(() => {
    store.dicStore.getDictionaryByType('eventType')

    store.dicStore.getDictionaryByType('eventState')
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  return useObserver(() => (
    <div className={styles['event-list']}>
      <WrappedSearchForm onSubmit={handleSubmit} />
      <div className={styles.title}>待办列表</div>
      <Table
        onChange={setPagination}
        pagination={pagin}
        dataSource={store.myTaskStore.listCtd}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  ))
}
