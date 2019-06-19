import { get } from '@/utils/request'

export async function getTopData() {
  return get('/rest/traffic/remotting/getcurrent')
}
// 车流量
export async function getCarData(params) {
  return get('/rest/traffic/remotting/trafficcount', params)
}
// 车型统计
export async function getCarTypeData(params) {
  return get('/rest/traffic/remotting/traffictype', params)
}
// 人流量
export async function getPersonData(params) {
  return get('/rest/traffic/remotting/personflow', params)
}
