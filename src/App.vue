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
import { reactive } from 'vue';
import Sidebar from './components/Sidebar.vue'
import { conf_init } from './components/webusb';
export default {
  components: {
    Sidebar
  },
  mounted(){
    conf_init();
  }
}
</script>


<style scoped>
</style>