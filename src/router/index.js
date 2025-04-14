import { createRouter, createWebHashHistory } from 'vue-router';
import dashboard from "@/modules/dashboard/dashboard";
import CustomerModule from '../modules/customer/CustomerModule';
import OutletModule from '../modules/outlet/OutletModule';
import SettingModule from '../modules/settings/SettingModule';
import RoleModule from '../modules/roles/RoleModule';

import basicSettings from "@/modules/settings/basicSettings";
import RoleList from "@/modules/roles/RoleList";
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
    meta: {
      title: "Dashboard"
    }
  },

  {
    path: '/customer',
    name: 'customer',
    meta: {
      title: "Customer"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CustomerModule
  },
  {
    path: '/roles',
    name: 'roles',
    meta: {
      title: "Roles"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RoleModule,
    redirect: '/roles/roles',
    children: [
      {
        path: '/roles/roles',
        component: RoleList
      }
    ]
  },
  {
    path: '/outlet',
    name: 'outlet',
    meta: {
      title: "Outlet"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OutletModule
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: "Settings"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SettingModule,
    redirect: '/setting/basic-settings',
    children: [
        {
        path: '/setting/basic-settings',
        component: basicSettings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "apbd-active",
  linkExactActiveClass: "apbd-exact-active",
})

export default router
