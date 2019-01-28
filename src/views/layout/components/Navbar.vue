<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <!--<span>XX管理系统</span>    -->
    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>

        <!--全屏操作-->
        <!--<el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">-->
        <!--<screenfull class="screenfull right-menu-item"/>-->
        <!--</el-tooltip>-->

        <!--布局大小-->
        <!--<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">-->
        <!--<size-select class="international right-menu-item"/>-->
        <!--</el-tooltip>-->

        <!--语言选择-->
        <!--<lang-select class="international right-menu-item"/>-->

        <!--<el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">-->
        <!--<theme-picker class="theme-switch right-menu-item"/>-->
        <!--</el-tooltip>-->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <template v-if="loginUserInfo && loginUserInfo.role_name && loginUserInfo.username">
            {{ loginUserInfo.role_name }}({{ loginUserInfo.username }})
          </template>
          <template v-else>
            加载中
          </template>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="hasPermission_cleanCache" >
            <span style="display:block;" @click="openCleanCache">清理缓存</span>
          </el-dropdown-item>

          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import request from '@/utils/request'
import { Message } from 'element-ui'
import { getWebAppBaseURL } from '@/utils/ztbcms_utils'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device',
      'loginUserInfo'
    ]),
    hasPermission_cleanCache() {
      return this.hasRolePermission('/Admin/Index/cache')
    }
  },
  mounted(){
    console.log(this.loginUserInfo)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      request({
        url: '/Admin/AdminApi/logout',
        method: 'get',
        params: {}
      }).then(response => {
        const res = response.data
        if (res.status) {
          Message.success(res.msg)
          setTimeout(() => {
            window.location.replace(res.data.redirect)
          }, 700)
        } else {
          Message.error(res.msg)
        }
      })
    },
    openCleanCache() {
      this.openNewFrame('缓存更新', '/Admin/Index/cache', getWebAppBaseURL() + '/Admin/Index/cache')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
