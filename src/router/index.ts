import Index from "../components/Index.vue";
import Joystick from "../components/Joystick.vue";
import Rumble from "../components/Rumble.vue";
import Gyro from "../components/Gyro.vue";
import Rgb from "../components/Rgb.vue";
import Others from "../components/Others.vue";
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
const routes = [
    { path: '/', name: 'Home', component: Index },
    { path: '/Joystick', name: 'Joystick', component: Joystick},
    { path: '/Rumble', name: 'Rumble', component: Rumble},
    { path: '/Gyro', name: 'Gyro', component: Gyro},
    { path: '/Rgb', name: 'Rgb', component: Rgb},
    { path: '/Others', name: 'Others', component: Others},
  ];
const router = createRouter({
    history: createWebHashHistory(),
    routes, // 路由配置
  });
export default router;