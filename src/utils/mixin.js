import Layout from '@/views/layout/Layout'

export default {
  methods: {
    /**
     * 打开新窗口
     * @param title
     * @param router_path
     * @param url
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
