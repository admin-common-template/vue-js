/**
 * @description 获取设备类型
 * @returns { string } 'android' | 'ios' | 'web'
 */
export const deviceType = () => {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) return 'android'
  if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return 'ios'
  return 'web'
}

/**
   * @description 获取数据类型
   * @param { any } value 查询类型的值
   * @returns { string } 'String' | 'Number' | 'Boolean' | 'Object' | 'Array' | ......
   */
export const getType = (value) => toString.call(value).slice(8, -1)

/**
 * @description 绑定事件 on(event, handler)
 */

export const eventOn = (event, handler) => {
  if (document.addEventListener) {
    return window.addEventListener(event, handler, false)
  }
}

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const eventOff = (function () {
  if (document.removeEventListener) {
    return function (event, handler) {
      if (event) {
        window.removeEventListener(event, handler, false)
      }
    }
  }
}())
