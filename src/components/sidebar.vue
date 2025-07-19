<template>
  <div id="sidebar">
    <n-layout-sider 
      bordered
      collapse-mode="width"
      :width="240"
      :collapsed-width="64"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
      content-style="padding: 16px;">
      <n-layout>
        <n-menu :collapsed-width="32" :collapsed-icon-size="22" :options="navs" />
      </n-layout>
      <n-layout>
        <n-menu :collapsed-width="32" :collapsed-icon-size="22" :options="buttons" @update:value="buttons_handler"/>
      </n-layout>
    </n-layout-sider>
  </div>
</template>
<style scoped>
.Sidebar {
  background: rgba(128, 128, 128, 0.3);
}
</style>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import {
  LogOutOutline as HomeIcon,
  LaptopOutline as WorkIcon,
  ArrowUpOutline as ReadIcon,
  ArrowDownOutline as DownloadIcon,
  SaveOutline as SaveIcon,
  PowerOutline as RestartIcon,
  OpenOutline as OpenIcon,
  RefreshCircleOutline as ResetIcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fw_snd, open_device, read_conf, send_conf } from './webusb'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const navs: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Home'}},
        {default: () => '首页(HomePage)'}
      ),
    key: 'Home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Others'}},
        {default: () => '其它(Others)'}
      ),
    key: 'Others',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Rgb'}},
        {default: () => 'RGB'}
      ),
    key: 'Rgb',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Joystick'}},
        {default: () => '摇杆(Joystick)'}
      ),
    key: 'Joystick',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Rumble'}},
        {default: () => '震动(Rumble)'}
      ),
    key: 'Rumble',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Gyro'}},
        {default: () => '体感(GYRO)'}
      ),
    key: 'Gyro',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {to: {name: 'Info'}},
        {default: () => '信息(Info)'}
      ),
    key: 'Info',
    icon: renderIcon(HomeIcon)
  },
]
const buttons:MenuOption[]=[
  {
    label: 'Open',
    key: 'open',
    icon:renderIcon(OpenIcon),
  },
  {
    label: 'Read',
    key: 'read',
    icon:renderIcon(ReadIcon),
  },
  {
    label: 'Set',
    key: 'set',
    icon:renderIcon(DownloadIcon),
  },
  {
    label: 'Save',
    key: 'save',
    icon:renderIcon(SaveIcon),
  },
  {
    label:'Restart',
    key:'restart',
    icon:renderIcon(RestartIcon),
  }
]

export default defineComponent({
  setup() {
    return {
      navs,
      buttons,
      collapsed:ref(false),
      open_device,
    }
  },
  methods:{
    buttons_handler(key: string, item: MenuOption) {
      //item.callback();
      if(key=='open'){
        open_device();
      }else if(key=='read'){
        read_conf();
      }else if(key=='set'){
        send_conf(0);
      }else if(key=='save'){
        send_conf(1);
      }else if(key=='restart'){
        fw_snd(0xFE, null);
      }
    }
  }
})
</script>