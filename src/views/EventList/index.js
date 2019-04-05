import React, { useState, useCallback, useMemo, useEffect } from 'react'

import { notification } from 'antd'

import { useFetch } from '@/utils/use'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'

import { getEventList, deleteEventById } from './service'

import styles from './index.module.less'

export default (props) => {
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

  const { data: list, isLoading, res } = useFetch(getEventList, params, [])

  const handleSubmit = useCallback((searchData) => {
    setSearchForm(searchData)

    setPagination(state => ({ ...state, current: 1 }))
  }, [])

  const handleDelete = useCallback(async (id) => {
    const res = await deleteEventById({ id })

    if (res.code === 'success') {
      notification.success({ duration: 2, message: res.msg || '删除成功' })

      setSearchForm(state => ({ ...state }))
    } else {
      notification.error({ duration: 2, message: res.msg || '删除失败' })
    }
  }, [])

  useEffect(() => {
    if (res.code === 0) {
      // // 纠正分页信息（增加或者减少）
      // if (params.pageIndex !== res.pageIndex
      //   || Math.floor(pagination.total / pagination.pageSize) !== res.pageCount) {
      //   setPagination(state => ({
      //     ...state,
      //     total: res.total,
      //     current: res.pageIndex,
      //   }))
      // }

      setPagination(state => ({
        ...state,
        total: res.total,
      }))
    }
  })

  const pagin =
    Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  return (
    <div className={styles['event-list']}>
      <WrappedSearchForm onSubmit={handleSubmit} />
      <div className={styles.title}>事件管理列表</div>
      <Table
        onDelete={handleDelete}
        onChange={setPagination}
        pagination={pagin}
        dataSource={list}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  )
}