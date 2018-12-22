<template>
  <div >
    Loading...
  </div>
</template>

<script>
import { parserMenuList } from '@/utils/ztbcms_utils'
import request from '@/utils/request'

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
      request({
        url: '/Admin/AdminApi/getMenuList',
        method: 'get',
        params: {}
      }).then(response => {
        const res = response.data
        if (res.status) {
          this.addMenus(res.data)
        } else {
          alert(res.msg)
        }
      })
    },
    addMenus(menus) {
      const menuList = parserMenuList(menus)

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
