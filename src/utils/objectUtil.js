/**
 * 对象相关工具库
 */

/**
 * @description
 * 根据传入的对象属性描述，获取对象内部的属性
 * 例如：
 * obj: { res: { data: { user: { name: 'test' } } } }
 * path: 'res.data.user'
 * 将返回 { name: 'test' }
 * @param [Object] obj 被操作对象
 * @param [string] path 描述对象属性的路径
 * @return 目标属性值 (找不到时返回 undefined)
 */
export function getPropVal (obj, path) {
  const val = path.split('.').reduce((m, n) => {
    return m && m[n]
  }, obj)

  return val
}

/**
 * @description                       格式化日期
 * @param  {Date}                     日期
 * @return {Promise}                  格式化后的日期字符串
 */
export function formatDateTime (date, format) {
  const mapping = {
    // 年
    'y+': date.getFullYear(),
    // 月份
    'M+': date.getMonth() + 1,
    // 日
    'd+': date.getDate(),
    // 小时
    'H+': date.getHours(),
    // 分
    'm+': date.getMinutes(),
    // 秒
    's+': date.getSeconds(),
  }

  new RegExp('(y+)').test(format) &&
    (format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)))

  Object.entries(mapping)
    .forEach(([key, val]) => new RegExp(`(${key})`).test(format) &&
      (format =
        format.replace(RegExp.$1, RegExp.$1.length === 1 ? `${val}` : `${val}`.padStart(RegExp.$1.length, '0'))))

  return format
}

/**
 * @description                       将函数转成防抖动函数
 * @param  {Function}                 需要转成防抖动函数的函数
 * @param  {number}                   延迟时间（毫秒数）
 * @param  {boolean}                  是否执行第一次
 * @return {undefined}                无返回值
 */
export function debounce (fn, delay = 600, runFirstFn = true) {
  let timer = null

  return function (...rest) {
    // 清除定时器
    clearTimeout(timer)

    if (runFirstFn) {
      fn.apply(this, rest)
      runFirstFn = false
      return
    }

    // 设置定时器
    timer = setTimeout(fn.bind(this, ...rest), delay)
  }
}

/**
 * @description                       将函数转成节流函数
 * @param  {Function}                 需要转成节流函数的函数
 * @param  {number}                   间隔时间（毫秒数）
 * @param  {boolean}                  是否执行第一次
 * @return {undefined}                无返回值
 */
export function throttle (fn, delay = 600, runFirstFn = true) {
  let timer = null
  let timerStart

  return function (...rest) {
    const timeCurr = +new Date()

    clearTimeout(timer)

    if (!timer) {
      timerStart = timeCurr

      if (runFirstFn) {
        fn.apply(this, rest)
        runFirstFn = false
        return
      }
    }

    if (timeCurr - timerStart >= delay) {
      fn.apply(this, rest)
      timerStart = timeCurr
    } else {
      timer = setTimeout(fn.bind(this, ...rest), delay)
    }
  }
}

/**
 * @description                 增强自动补全函数使其能够进行缓存
 * @param         [Function]    需要进行缓存的函数
 * @return        [Function]    可以进行缓存的函数
 */
export function memory (fn) {
  let cache = new Map()

  return (...rest) => {
    if (cache.size === 10) {
      const arr = [...cache.entries()]
        .sort(([, value1], [, value2]) => value1 - value2)
        .splice(3, 4)
      cache = new Map(arr)
    }

    const data = cache.get(rest[0])

    if (data) {
      data.count++
      rest[1](data.list)
    } else {
      fn(...rest).then((list) => {
        cache.set(rest[0], { count: 1, list })
        rest[1](list)
      })
    }
  }
}

/**
 * @description                       从右往左执行函数
 * @param  {Function}                 需要执行的函数
 * @return {any}                      函数执行的结果
 */
export function compose (...fns) {
  return (...args) => {
    const len = fns.length

    // len - index === 1 来判断是否是第一个需要执行的函数
    return fns.reduceRight((result, fn, index) =>
      len - index === 1 ? fn(...result) : fn(result), args)
  }
}

/**
 * @description                       从左往右执行函数
 * @param  {Function}                 需要执行的函数
 * @return {any}                      函数执行的结果
 */
export function pipe (...fns) {
  return (...args) =>
    fns.reduce((result, fn, index) => index ? fn(result) : fn(...result), args)
}

export function isUndefinedOrNull (value) {
  return value === null || value === undefined
}
