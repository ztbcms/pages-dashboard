import Layout from '@/views/layout/Layout'

/**
 * 解析菜单
 * @param menuList
 * @returns {Array}
 */
export function parserMenuList(menuList) {
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
          icon: menu.icon,
          url: menu.url
        },
        children: []
      }

      if (menu.items && menu.items.length > 0) {
        item.children = parserMenuList(menu.items)
        item.redirect = item.children[0].path
      }
      result.push(item)
    })
  }

  return result
}
