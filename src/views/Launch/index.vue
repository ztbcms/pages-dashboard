<template>
  <div >
    empty
  </div>
</template>

<script>
import Layout from '@/views/layout/Layout'

export default {
  name: 'Launch',
  components: {},
  mixins: [],
  computed: {},
  mounted() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      const menuList = [
        {
          path: '/content',
          component: Layout,
          name: 'content',
          // redirect: "/content/contentManage",
          alwaysShow: true,
          meta: { title: '内容', icon: 'zip' },
          children: [
            {
              path: 'contentManage',
              component: Layout,
              name: 'contentManage',
              meta: { title: '内容管理', url: 'https://router.vuejs.org' }
            },
            {
              path: 'sendManage',
              component: Layout,
              name: 'sendManage',
              meta: { title: '发布管理', url: 'https://www.aliyun.com/' }
            }
          ]
        }
      ]

      this.$store.commit('SET_ROUTERS', menuList)
      this.$router.addRoutes(menuList)
      // 筛选第一个
      if (menuList.length > 0) {
        const first_children = menuList[0].children
        if (first_children && first_children.length > 0) {
          const second_children = first_children[0].children
          if (second_children && second_children.length > 0) {
            this.$router.push({ name: second_children[0]['name'] })
          } else {
            this.$router.push({ name: first_children[0]['name'] })
          }
        } else {
          this.$router.push({ name: menuList[0]['name'] })
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
