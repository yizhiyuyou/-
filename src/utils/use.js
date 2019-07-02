import { useReducer, useEffect, useState, useCallback, useRef } from 'react'

import { notification } from 'antd'

import { isUndefinedOrNull } from '@/utils/objectUtil'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        res: {
          code: -1,
          msg: '',
          list: [],
          pageIndex: 0,
          pageSize: 0,
          pageCount: 0,
          total: 0,
          data: {},
        },
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        ...action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      }
    default:
      throw new Error()
  }
}

export function useFetch(fetchFn, cb, initialData, params) {
  const [innerParams, setParams] = useState(null)

  const wrapSetParams = useCallback(data => {
    setParams(isUndefinedOrNull(data) ? {} : data)
  }, [])

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    res: {
      code: -1,
      msg: '',
      list: [],
      pageIndex: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
      data: {},
    },
    setParams: wrapSetParams,
  })

  useEffect(() => {
    if (isUndefinedOrNull(innerParams) && isUndefinedOrNull(params)) {
      return
    }

    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const res = await fetchFn(isUndefinedOrNull(innerParams) ? params : innerParams)

        // 组件销毁后，不进行任何操作
        if (didCancel) {
          return
        }

        if (res.code === 0) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              data: res.list || res.data,
              res,
            },
          })
        } else {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: {
              isError: true,
              res,
            },
          })
        }
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: {
            isError: true,
          },
        })
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [innerParams, params])

  // 提供正常 cb 调用方式
  useEffect(() => {
    const {
      res,
      res: { code },
    } = state

    if (cb && typeof cb === 'function' && code !== -1) {
      return cb(res, innerParams || params)
    }
  }, [state.res])

  return state
}

export function useModal({ saveData, getList, setPagination }, formProps) {
  const dataRef = useRef(null)

  const [visible, setVisible] = useState(false)

  const [modalFormData, setModalFormData] = useState({})

  const handleEditAble = useCallback((row = {}) => {
    const params = formProps
      ? formProps.reduce((prev, prop) => ({ ...prev, [prop]: row[prop] }), {})
      : row

    dataRef.current = { id: row.id }

    setModalFormData(params)

    setVisible(true)
  }, [])

  const handleAdd = useCallback((data = {}) => {
    typeof data.stopPropagation !== 'function' && (dataRef.current = data)

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

  const { setParams, isLoading } = useFetch(saveData, (res, { id } = {}) => {
    if (res.code === 0) {
      notification.success({ duration: 2, message: '保存成功' })

      // id 不存在说明是新增，需要设置为第一页
      id || (setPagination && setPagination({ current: 1 }))

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
    handleEditAble,
    handleAdd,
    handleOk,
    handleCancel: close,
    modalFormData,
    afterClose,
  }
}
