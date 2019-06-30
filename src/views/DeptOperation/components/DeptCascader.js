import React, { useEffect, useMemo, useCallback } from 'react'

import { Cascader } from 'antd'

import { useFetch } from '@/utils/use'

import { getDeptTree } from '../service'

const fieldNames = { label: 'text', value: 'code' }

function getFullValueByCode(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    const { code, children } = arr[i]

    // 找到就停止
    if (code === val) {
      return [code]
    }

    // 有子项就继续往下
    if (Array.isArray(children) && children.length) {
      const fullValue = getFullValueByCode(children, val)

      if (Array.isArray(fullValue) && fullValue.length) {
        return [code, ...fullValue]
      }
    }
  }

  return []
}

export default ({ value, onChange, ...rest }, ref) => {
  const { data, setParams } = useFetch(getDeptTree, null, [])

  useEffect(setParams, [])

  const innerVal = useMemo(() => {
    return getFullValueByCode(data, value)
  }, [value, data])

  const handleChange = useCallback(value => {
    onChange(value.length ? value[value.length - 1] : '')
  })

  return (
    <Cascader
      ref={ref}
      value={innerVal}
      onChange={handleChange}
      options={data}
      fieldNames={fieldNames}
      allowClear
      changeOnSelect
      placeholder="请选择上级部门"
      {...rest}
    />
  )
}
