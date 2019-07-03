import React, { useState, useCallback, useEffect, useRef } from 'react'

import { Spin, notification } from 'antd'

import NoticeForm from './components/NoticeForm'

import { useFetch } from '@/utils/use'

import { getInfo, saveInfo } from './service'

import styles from './index.module.less'

export default ({
  match: {
    params: { id },
  },
  history,
}) => {
  const dataRef = useRef({})

  const [data, setData] = useState({
    noticeTitle: '',
    noticeSource: '',
    noticeType: 0,
    noticeDept: [],
    noticeContent: '',
  })

  const { isLoading: isLoadingBySave, setParams: saveData } = useFetch(saveInfo, res => {
    if (res.code === 0) {
      notification.success({
        message: '成功',
        description: `${id ? '保存' : '新增'}通告成功`,
      })

      history.goBack()
    } else {
      notification.error({
        message: '失败',
        description: res.msg || `${id ? '保存' : '新增'}通告失败`,
      })
    }
  })

  const handleSubmit = useCallback((fromData, attachData) => {
    const { noticeType, noticeDept, ...rest } = fromData
    const { noticeDeptname, ...dataRefRest } = dataRef.current
    const { noticeDeptname: attachDataNoticeDeptname, ...attachDataRest } = attachData

    const params = { ...rest, ...dataRefRest, ...attachDataRest, noticeType }

    if (noticeType === 1) {
      Object.assign(params, {
        noticeDept: noticeDept.join(','),
        noticeDeptname: (attachDataNoticeDeptname !== null
          ? attachDataNoticeDeptname
          : noticeDeptname
        ).join(','),
      })
    }

    if (id) {
      Object.assign(params, { id })
    }

    saveData(params)
  }, [])

  const { setParams, isLoading } = useFetch(getInfo, res => {
    if (res.code === 0) {
      const { noticeDeptname, ...rest } = res.data

      dataRef.current = { ...dataRef.current, noticeDeptname }

      setData(rest)
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
        <span className={styles.title}>{id ? '修改通告' : '新增通告'}</span>
        <NoticeForm
          value={data}
          onSubmit={handleSubmit}
          className={styles.form}
          isEdit={!!id}
          isLoading={isLoadingBySave}
        />
      </Spin>
    </div>
  )
}
