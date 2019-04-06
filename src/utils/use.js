import { useReducer, useEffect } from 'react'

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

export function useFetch (fetchFn, params, initialData, cb) {
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
  })

  useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const res = await fetchFn(params)
        
        // 组件销毁后，不进行任何操作
        if (didCancel) { return }

        if (res.code === 0) {
          dispatch({ type: 'FETCH_SUCCESS', payload: {
            data: res.list || res.data,
            res,
          }})
        } else {
          dispatch({ type: 'FETCH_FAILURE', payload: {
            isError: true,
            res,
          }})
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: {
          isError: true,
        }})
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [params])

  // 提供正常 cb 调用方式
  useEffect(() => {
    const { res, res: { code } } = state

    if (cb && typeof cb === 'function' && code !== -1) {
      return cb(res)
    }
  }, [state.res])

  // 提供 useCb cb 调用方式
  // function useCb (cb) {
  //   useEffect(() => cb(state.res), [state.res])
  // }

  return state
}