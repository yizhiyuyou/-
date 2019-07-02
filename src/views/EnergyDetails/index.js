import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification } from 'antd'

import { useFetch, useModal } from '@/utils/use'

import { StoreContext } from '@/stores'

import WrappedSearchForm from './components/SearchForm'
import Table from './components/Table'
import Modal from './components/Modal'

import styles from './index.module.less'

export default () => {
  const { dicStore, EnergyDetailsStore } = useContext(StoreContext)

  const {
    setSearch,
    pagination,
    setPagination,
    getList,
    deleteItemById,
    saveData,
  } = EnergyDetailsStore

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
    dicStore.getDictionaryByType('energyType')

    getList()
  }, [])

  const pagin = Math.floor(pagination.total / pagination.pageSize) ? pagination : false

  const {
    visible,
    isLoading,
    handleEditAble,
    handleOk,
    handleCancel,
    modalFormData,
    afterClose,
  } = useModal({ saveData, getList, setPagination })

  return useObserver(() => (
    <div className={styles.container}>
      <WrappedSearchForm
        value={EnergyDetailsStore.search}
        onChange={setSearch}
        onSubmit={handleSubmit}
      />
      <div className={styles.title}>
        <span>能耗明细列表</span>
      </div>
      <Table
        onEdit={handleEditAble}
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={EnergyDetailsStore.listCtd}
        loading={EnergyDetailsStore.isLoading}
        rowKey="id"
      />
      <Modal
        visible={visible}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        onOk={handleOk}
        value={modalFormData}
        afterClose={afterClose}
      />
    </div>
  ))
}
