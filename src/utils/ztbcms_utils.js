import Layout from '@/views/layout/Layout'

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
        children: []
      }

      if (menu.items && menu.items.length > 0) {
        item.children = parserMenuList(menu.items, level + 1)
        item.redirect = item.children[0].path
      }
      result.push(item)
    })
  }

  return result
}
