import React, { useState, useCallback } from 'react'

import { DatePicker } from 'antd'

export default ({ value, onChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const [mode, setMode] = useState(['month', 'month'])

  const onPanelChange = useCallback((value, mode) => {
    const formatterMode = [
      mode[0] === 'date' ? 'month' : mode[0],
      mode[1] === 'date' ? 'month' : mode[1],
    ]

    setMode(formatterMode)

    if (formatterMode.every(str => str === 'month')) {
      triggerChange(value)

      setIsOpen(false)
    }
  })

  function triggerChange(changedValue) {
    if (onChange) {
      onChange(changedValue)
    }
  }

  const handleChange = useCallback(val => {
    triggerChange(val)
  })

  return (
    <span ref={ref}>
      <DatePicker.RangePicker
        onOpenChange={setIsOpen}
        onPanelChange={onPanelChange}
        value={value}
        onChange={handleChange}
        open={isOpen}
        mode={mode}
        format="YYYY-MM"
      />
    </span>
  )
}
