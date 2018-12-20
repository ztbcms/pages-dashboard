<template>
  <section class="app-main">
    <!-- <iframe :src="currentRouter" style="width: 100%;height: 100%;"></iframe> -->
    <template v-for="view in visitedViews">
      <iframe :class="{'hidden': view.name != currentRouter}" :key="view.name" :src="'http://baidu.com/s?wd='+view.fullPath" class="iframe"/>
    </template>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    currentRouter() {
      return this.$route.name
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  /* position: relative; */
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right:0;
  left: 0;
  top: 80;
}

.hidden{
  display: none;
}
.iframe{
      width: 100%;
    position: absolute;
    height: 100%;
}
</style>

