<template>
  <div>
    <p>功能demo演示,请把本页面的链接放到iframe中显示</p>
    <button @click="openNewFrame">iframe内通知父窗口打开新iframe</button>
  </div>
</template>

<script>

export default {
  name: 'Frametest',
  data() {

  },
  methods: {
    openNewFrame() {
      const event = new CustomEvent('adminOpenNewFrame', {
        detail: {
          title: '启动父窗口1', router_path: '/a/b/c', url: 'http://baidu.com'
        }
      })
      window.parent.dispatchEvent(event)
    }
  }
}
</script>

<style scoped>

</style>
