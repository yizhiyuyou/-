export const STATUS_MAPPING_INFO = new Map([
  [1, { name: '待处理', color: '#ff713f' }],
  [2, { name: '处置中', color: '#ffac53' }],
  [3, { name: '待验收', color: '#3890f2' }],
  [4, { name: '已结束', color: '#666' }],
])

export const STATUS = [...STATUS_MAPPING_INFO]
  .map(([value, { name: text }]) => ({
    value,
    text,
  }))

export const TYPE = [
  { text: '保洁', value: 1 },
  { text: '维修', value: 2 },
  { text: '其他', value: 3 },
]