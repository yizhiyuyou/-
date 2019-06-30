import React, { useState, useCallback, useEffect } from 'react'

import { Spin, notification } from 'antd'

import DeptForm from './components/DeptForm'

import { useFetch } from '@/utils/use'

import { getInfo, saveInfo } from './service'

import styles from './index.module.less'

export default ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [data, setData] = useState({
    name: '',
    parentId: '',
    orderNum: 0,
  })

  const { isLoading: isLoadingBySave, setParams: saveData } = useFetch(saveInfo, res => {
    if (res.code === 0) {
      notification.success({
        message: '成功',
        description: `${id ? '修改' : '新增'}用户成功`,
      })

      history.goBack()
    } else {
      notification.error({
        message: '失败',
        description: res.msg || `${id ? '修改' : '新增'}用户失败`,
      })
    }
  })

  const handleSubmit = useCallback(fromData => {
    const params = id ? { ...fromData, id } : fromData

    saveData(params)
  }, [])

  const { setParams, isLoading } = useFetch(getInfo, res => {
    if (res.code === 0) {
      setData(res.data)
    }
  })

  useEffect(() => {
    if (id) {
      setParams({ id })
    }
  }, [])

  return (
    <div className={styles.container}>
      <Spin tip="正在加载信息..." spinning={isLoading}>
        <span className={styles.title}>{id ? '修改部门' : '新增部门'}</span>
        <DeptForm
          value={data}
          onChange={setData}
          onSubmit={handleSubmit}
          className={styles.form}
          isEdit={!!id}
          isLoading={isLoadingBySave}
        />
      </Spin>
    </div>
  )
}
