import Layout from '@/views/layout/Layout'

export default {
  methods: {
    /**
     * 检测是否存在权限
     * @param access_router 访问的路由，格式必须是：/module/controller/action   (与后台的权限配置时一致的)
     * @returns {boolean}
     */
    hasRolePermission(access_router) {
      const roleAccessList = this.$store.state.permission.roleAccessList

      const access_router_arr = access_router.split('/')

      if (access_router_arr.length < 4) {
        return false
      }
      const module = access_router_arr[1]
      const controller = access_router_arr[2]
      const action = access_router_arr[3]

      // 检测 module 是否有权限
      for (let i = 0; i < roleAccessList.length; i++) {

        if (roleAccessList[i].app === '%') {
          return true
        }
        if (roleAccessList[i].app === module) {
          // 检测 controller 是否有权限
          if (roleAccessList[i].controller === '%') {
            return true
          }
          if (roleAccessList[i].controller === controller) {
            // 检测 action 是否有权限
            if (roleAccessList[i].action === '%') {
              return true
            }
            if (roleAccessList[i].action === action) {
              return true
            }
          }
        }
      }

      return false
    },
    /**
     * 打开新窗口
     * @param title 标题
     * @param router_path 路由(相对路径)
     * @param url 对应的URL
     */
    openNewFrame(title, router_path, url) {
      const router = {
        path: router_path,
        name: router_path,
        component: Layout,
        meta: { title: title, icon: '', url: url }
      }

      this.$router.addRoutes([router])
      this.$router.push(router.name)
    }
  }

}
