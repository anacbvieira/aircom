import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Options from '../views/Options.vue';
import Confirm from '../views/ConfirmFlight.vue';
import Alter from '../views/AlterFlight.vue';
import Cancel from '../views/CancelFlight.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/options',
    name: 'options',
    component: Options,
  },
  {
    path: '/confirmflight',
    name: 'confirmflight',
    component: Confirm,
  },
  {
    path: '/alterflight',
    name: 'alterflight',
    component: Alter,
  },
  {
    path: '/cancelflight',
    name: 'cancelflight',
    component: Cancel,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
