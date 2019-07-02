import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useObserver } from 'mobx-react-lite'

import { notification, Button } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import Table from './components/Table'
import Modal from './components/Modal'

import styles from './index.module.less'

function useModal() {
  const {
    RoleManaStore: { saveData, getList, setPagination },
  } = useContext(StoreContext)

  const [visible, setVisible] = useState(false)

  const [modalFormData, setModalFormData] = useState({})

  const handleEdit = useCallback(({ id, roleName, remark, deptId } = {}) => {
    const params = { roleName, remark, deptId }

    id && Object.assign(params, { id })

    setModalFormData(params)

    setVisible(true)
  }, [])

  const handleAdd = useCallback(() => {
    setModalFormData({})

    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const afterClose = useCallback(() => {
    setModalFormData({})
  }, [])

  const { setParams, isLoading } = useFetch(saveData, (res, { id }) => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '保存成功' })

      // id 不存在说明是新增，需要设置为第一页
      id || setPagination({ current: 1 })

      getList()

      close()
    } else {
      notification.error({ duration: 2, message: res.msg || '保存失败' })
    }
  })

  return {
    visible,
    isLoading,
    handleEdit,
    handleOk: setParams,
    handleAdd,
    handleCancel: close,
    modalFormData,
    afterClose,
  }
}

export default () => {
  const { RoleManaStore } = useContext(StoreContext)

  const { pagination, setPagination, getList, deleteItemById } = RoleManaStore

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

  const {
    visible,
    isLoading,
    handleEdit,
    handleOk,
    handleAdd,
    handleCancel,
    modalFormData,
    afterClose,
  } = useModal()

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>角色管理列表</span>
        <Button onClick={handleAdd} type="primary" size="large" icon="plus-circle">
          新增角色
        </Button>
      </div>
      <Table
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChange={handleChange}
        pagination={pagin}
        dataSource={RoleManaStore.list}
        loading={RoleManaStore.isLoading}
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
