import {createRouter, createWebHashHistory} from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import Login from "@/views/Login";
const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: "/",
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes
})

export default router
