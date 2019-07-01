import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'

import { useObserver } from 'mobx-react-lite'

import { Collapse, notification } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import SearchForm from './components/SearchForm'
import AddBtn from './components/AddBtn'
import Header from './components/Header'
import Content from './components/Content'
import Modal from './components/Modal'

import styles from './index.module.less'

const { Panel } = Collapse

function useModal() {
  const {
    DictionaryManaStore: { saveData, getList },
  } = useContext(StoreContext)

  const dataRef = useRef(null)

  const [visible, setVisible] = useState(false)

  const [modalFormData, setModalFormData] = useState({})

  const handleAdd = useCallback(data => {
    dataRef.current = data

    setModalFormData({})

    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const afterClose = useCallback(() => {
    setModalFormData({})

    dataRef.current = null
  }, [])

  const { setParams, isLoading } = useFetch(saveData, res => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '保存成功' })

      getList()

      close()
    } else {
      notification.error({ duration: 2, message: res.msg || '保存失败' })
    }
  })

  const handleOk = useCallback(
    data => {
      setParams(Object.assign({}, dataRef.current, data))
    },
    [setParams]
  )

  return {
    visible,
    isLoading,
    handleOk,
    handleAdd,
    handleCancel: close,
    modalFormData,
    afterClose,
  }
}

export default () => {
  const { DictionaryManaStore } = useContext(StoreContext)

  const { setSearch, getList, deleteItemById, setActiveKey } = DictionaryManaStore

  const { setParams: handleClickDelte } = useFetch(deleteItemById, res => {
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

  const {
    visible,
    isLoading,
    handleOk,
    handleAdd,
    handleCancel,
    modalFormData,
    afterClose,
  } = useModal()

  return useObserver(() => (
    <div className={styles.container}>
      <SearchForm value={DictionaryManaStore.search} onChange={setSearch} onSubmit={getList} />
      <Collapse
        activeKey={DictionaryManaStore.activeKey}
        onChange={setActiveKey}
        bordered={false}
        expandIconPosition="right"
        className={styles.collapse}
      >
        {DictionaryManaStore.list.map(({ name, headerList, contentList, type }, index) => (
          <Panel
            header={<Header name={name} list={headerList} onDelete={handleClickDelte} />}
            key={index}
            showArrow={!!contentList.length}
            extra={<AddBtn onClick={() => handleAdd({ type })} />}
          >
            {<Content list={contentList} onDelete={handleClickDelte} />}
          </Panel>
        ))}
      </Collapse>
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
