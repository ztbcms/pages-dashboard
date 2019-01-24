<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import request from '@/utils/request'
import { Message } from 'element-ui'
import md5 from 'md5'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.registerEvent()
    this.getAdminUserInfo()
  },
  beforeDestroy() {
    this.unregisterEvent()
  },
  methods: {
    registerEvent() {
      window.addEventListener('adminOpenNewFrame', this.handleEvent_adminOpenNewFrame.bind(this))
      window.addEventListener('adminRefreshFrame', this.handleEvent_adminRefreshFrame.bind(this))

      window.__adminOpenNewFrame = (config) => {
        const title = config.title || ''
        const router_path = '/' + md5(config.url)
        const url = config.url || ''

        const event = new CustomEvent('adminOpenNewFrame', {
          detail: {
            title: title,
            router_path: router_path,
            url: url
          }
        })
        window.parent.dispatchEvent(event)
      }
    },
    unregisterEvent() {
      window.__adminOpenNewFrame = null

      window.removeEventListener('adminOpenNewFrame', this.handleEvent_adminOpenNewFrame.bind(this))
      window.removeEventListener('adminRefreshFrame', this.handleEvent_adminRefreshFrame.bind(this))
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    // 获取管理员信息
    getAdminUserInfo() {
      request({
        url: '/Admin/AdminApi/getAdminUserInfo',
        method: 'get',
        params: {}
      }).then(response => {
        const res = response.data
        if (res.status) {
          this.$store.commit('SET_ROLES', [res.data.role_id])
          this.$store.commit('SET_NAME', res.data.nickname)
          this.$store.commit('SET_AVATAR', res.data.avatar)
        } else {
          Message.error(res.msg)
        }
      })
    },
    // 打开新窗口
    handleEvent_adminOpenNewFrame(event) {
      const title = event.detail.title || ''
      const router_path = event.detail.router_path || ''
      const url = event.detail.url || ''
      this.openNewFrame(title, router_path, url)
    },
    // 刷新窗口
    handleEvent_adminRefreshFrame(event) {
      const refreshView = event.detail.refreshView
      console.log('handleEvent_adminRefreshFrame', refreshView)
      if (refreshView) {
        document.getElementById(refreshView.name).src = refreshView.meta.url
      }

    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
