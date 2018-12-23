import Layout from '@/views/layout/Layout'

export default {
  methods: {
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
