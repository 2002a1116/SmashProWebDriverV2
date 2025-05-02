import Index from "../components/Index.vue";
import Joystick from "../components/joystick.vue";
import Rumble from "../components/rumble.vue";
import Gyro from "../components/gyro.vue";
import Rgb from "../components/rgb.vue";
import Others from "../components/others.vue";
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