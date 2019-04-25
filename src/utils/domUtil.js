/**
 * 用于获取浏览器地址栏URL查询参数值
 * @param [string] paramKey 参数名称
 * @return [string] paramVal 参数值
 */
export function getQueryParam(paramKey) {
  const param = window.location.search.slice(1).split('&')

  let paramVal = ''
  param.forEach(element => {
    const item = element.split('=')
    if (item[0] === 'from') {
      paramVal = decodeURIComponent(item[1])
    }
  })

  return paramVal
}
