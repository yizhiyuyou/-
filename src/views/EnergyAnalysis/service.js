import { get } from '@/utils/request'

const TYPE_MAPPING_COLOR = new Map([['min', { color: '#ffac53' }], ['max', { color: '#eb3333' }]])

export async function getConsumeData(params) {
  const res = await get('/rest/energy/energyconsu/energy-statistics', params)

  if (res.code === 0) {
    const { maxMinData, lineChart } = res.data

    res.data = {
      lineChart,
      maxMinData: maxMinData.map(({ consumeType, type, yearAndMonth, num, reportTime }) => ({
        consumeType,
        text: `${consumeType === 'electric' ? '用电' : '用水'}${type === 'min' ? '最少' : '最多'}`,
        numColor: TYPE_MAPPING_COLOR.has(type) ? TYPE_MAPPING_COLOR.get(type).color : '',
        num,
        reportTime,
        yearAndMonth,
      })),
    }
  }

  return res
}
