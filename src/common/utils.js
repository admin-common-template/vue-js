import { childInfo } from '@/router/children'
import { menuIcons } from './config'

/**
 * @description 构建导航菜单数组
 * @param { data } 平铺的菜单数组
 * @param { id } 父级id，默认：0
 * @param { showOnPage } true：导航编辑，false：导航菜单，默认：false(true/false)
 */
export const menuTree = (data, id, showOnPage = false) => {
  const result = []
  let index = 0
  const currentIdList = []
  const lastList = []
  data.map((item) => {
    if (item.parent_id === id) currentIdList.push(item)
    else lastList.push(item)
  })
  currentIdList.map((item) => {
    let obj = {}
    if (showOnPage) {
      obj = {
        ...item,
        _showChildren: true,
      }
    }
    result[index] = {
      ...obj,
      name: item.only,
      path: childInfo[item.only],
      meta: {
        title: item.title,
      },
    }
    if (menuIcons[item.only]) {
      result[index].meta.icon = menuIcons[item.only]
    }
    const child = menuTree(lastList, item.rule_id, showOnPage)
    if (child.length) result[index].children = child
    index += 1
  })
  return result
}
