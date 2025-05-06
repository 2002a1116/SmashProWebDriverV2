<template>
  <div id="app">
    <n-layout has-sider>
        <Sidebar></Sidebar>
      <n-layout class="n-layout-content">
        <router-view></router-view>
      </n-layout>
    </n-layout has-sider>
  </div>
</template>
<script lang="ts">
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>


<style scoped>
</style>