import React, { useCallback, useContext, useEffect } from 'react'

import { useObserver } from 'mobx-react-lite'

import { useModal } from '@/utils/use'

import { StoreContext } from '@/stores'

import Table from './components/Table'
import Modal from './components/Modal'

import styles from './index.module.less'

export default () => {
  const { dicStore, MessageBoradStore } = useContext(StoreContext)

  const { pagination, setPagination, getList } = MessageBoradStore

  const handleChange = useCallback(pagination => {
    setPagination(pagination)

    getList()
  }, [])

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
  } = useModal({ getList, setPagination })

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>公众留言列表</span>
      </div>
      <Table
        onEdit={handleEditAble}
        onChange={handleChange}
        pagination={pagin}
        dataSource={MessageBoradStore.list}
        loading={MessageBoradStore.isLoading}
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
