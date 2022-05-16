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
  