import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { useModal } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import ChartEvaluation from './components/ChartEvaluation'
import Table from './components/Table'
import Modal from './components/Modal'

import styles from './index.module.less'

const FORM_PROPS = ['createTime', 'scoreText', 'createPhone', 'content']

export default () => {
  const {
    FeedBackStore,
    dicStore: { getDictionaryByType },
  } = useContext(StoreContext)

  const { setSearch, pagination, setPagination, getList, getChartList, saveData } = FeedBackStore

  const handleSubmit = useCallback(() => {
    setPagination({ current: 1 })

    getList()

    getChartList()
  }, [])

  const handleChange = useCallback(pagination => {
    setPagination(pagination)

    getList()
  }, [])

  useEffect(() => {
    getList()

    getChartList()

    getDictionaryByType('manyidu')
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  const { visible, handleEditAble, handleCancel, modalFormData, afterClose } = useModal(
    { saveData },
    FORM_PROPS
  )

  return useObserver(() => (
    <div className={styles.container}>
      <WrappedSearchForm
        value={FeedBackStore.search}
        onChange={setSearch}
        onSubmit={handleSubmit}
      />
      <ChartEvaluation className={styles.evaluation} />
      <Table
        onEdit={handleEditAble}
        onChange={handleChange}
        pagination={pagin}
        dataSource={FeedBackStore.listCtd}
        loading={FeedBackStore.isLoading}
        rowKey="id"
      />
      <Modal
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        value={modalFormData}
        afterClose={afterClose}
      />
    </div>
  ))
}
