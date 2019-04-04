import React, { useState, useEffect, useCallback } from 'react'

import { notification } from 'antd'

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

  const [list, setList] = useState([])

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback((searchData) => {
    setSearchForm(searchData)

    setPagination(state => ({ ...state, current: 1 }))
  }, [])

  const handleDelete = useCallback(async (id) => {
    const res = await deleteEventById({ id })

    if (res.code === 0) {
      notification.success({ duration: 2, message: '删除成功' })

      setSearchForm(state => ({ ...state }))
    } else {
      notification.error({ duration: 2, message: res.msg || '删除失败' })
    }
  }, [])

  const getParams = useCallback(() => {
    const { current: pageIndex, pageSize } = pagination

    return { ...searchForm, pageIndex, pageSize }
  }, [searchForm, pagination.current])

  useEffect(() => {
    let didCancel = false

    async function getListData () {
      setLoading(true)

      const params = getParams()
  
      const res = await getEventList(params)

      if (didCancel) { return }

      if (res.code === 0) {
        setList(res.list)
  
        // 纠正分页信息（增加或者减少）
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

      setLoading(false)
    }

    getListData()

    return () => {
      didCancel = true
    }
  }, [getParams])

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
        loading={loading}
        rowKey="id"
      />
    </div>
  )
}