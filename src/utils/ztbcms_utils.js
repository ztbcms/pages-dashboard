import Layout from '@/views/layout/Layout'
import { deepClone } from './index'

/**
 * 解析菜单
 * @param menuList
 * @param level 层级
 * @returns {Array}
 */
export function parserMenuList(menuList, level = 1) {
  const result = []
  if (menuList) {
    menuList.forEach((menu) => {
      const item = {
        path: menu.path,
        component: Layout,
        name: menu.path,
        alwaysShow: true,
        redirect: '',
        meta: {
          title: menu.name,
          icon: menu.icon || (level === 1 ? 'dashboard' : ''), // 第1层级才添加上默认的icon
          url: menu.url,
          level: level
        },
        children: null // 必须为null,如果[] 他会变成一个数组的监控数组对象，如果是空的话就不会了
      }

      if (menu.items && menu.items.length > 0) {
        item.children = parserMenuList(menu.items, level + 1)
        item.redirect = item.children[0].path
      } else {
        if (level === 1) {
          const cloneItem = deepClone(item)
          item.children = []
          item.children.push(cloneItem)
          item.path = item.name + '_top'
          item.name = item.path
          item.alwaysShow = false
          item.redirect = item.children[0].path
        }
      }

      result.push(item)
    })
  }

  return result
}

/**
 * 获取应用运行时的Base URL
 * @returns {string}
 */
export function getWebAppBaseURL() {
  return window.location.protocol + '//' + window.location.host
}

