import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'
import Modal from './components/Modal'

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
    deleteItemById,
    saveData,
  } = SparePartStockStore

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
    dicStore.getDictionaryByType('sparepartType')

    getList()
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  const [visible, setVisible] = useState(false)

  const [modalFormData, setModalFormData] = useState({})

  const handleEdit = useCallback(({ id, name, type, brand, count, model, markNote } = {}) => {
    const params = { name, type, brand, count, model, markNote }

    id && Object.assign(params, { id })

    setModalFormData(params)

    setVisible(true)
  }, [])

  const closeClear = useCallback(() => {
    setVisible(false)

    setModalFormData({})
  })

  const handleOk = useCallback(value => {
    const params = modalFormData.id ? Object.assign({}, value, { id: modalFormData.id }) : value

    setParams(params)
  })

  const { setParams, isLoading } = useFetch(saveData, res => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '保存成功' })

      getList()

      closeClear()
    } else {
      notification.error({ duration: 2, message: res.msg || '保存失败' })
    }
  })

  return useObserver(() => (
    <div className={styles['event-list']}>
      <WrappedSearchForm value={search} onChange={setSearch} onSubmit={handleSubmit} />
      <div className={styles.title}>备件库存</div>
      <Table
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={listCtd}
        loading={SparePartStockStore.isLoading}
        rowKey="id"
      />
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onCancel={closeClear}
        onOk={handleOk}
        value={modalFormData}
      />
    </div>
  ))
}
