import { useReducer, useEffect, useState } from 'react'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
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
        isError: action.payload,
      }
    default:
      throw new Error()
  }
}

// 用于校验该请求是否为列表请求
function useIsListFetch (params, initialData) {
  const [isList] = useState(() => {
    return Array.isArray(initialData)
      && params
      && params.hasOwnProperty('pageIndex')
      && params.hasOwnProperty('pageSize')
  })

  return isList
}

export function useFetch (fetchFn, params, initialData) {
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

        if (res.code === 0) {
          dispatch({ type: 'FETCH_SUCCESS', payload: {
            data: res.data || res.list,
            res,
          }})
        } else {
          dispatch({ type: 'FETCH_FAILURE', payload: res.msg || '我错了' })
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error || '我错了' })
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [params])

  return state
}

export function useFetchList (fetchFn, params) {
  const fetchData = useFetch(fetchFn, params, {
    list: [],
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
  })

  useEffect(() => {

  }, fetchData)
}