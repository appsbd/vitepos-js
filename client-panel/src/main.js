import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap"
import './assets/css/style.scss'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import {VTooltip, VClosePopper, Dropdown, Tooltip, Menu} from 'floating-vue'
import 'floating-vue/dist/style.css'
import {createGettext} from "@jshmrtn/vue3-gettext"
import VeeRules from "./libraries/AppsbdVeeRules";
const gettext = createGettext(vitePos.translationObj);
window.translateObj=gettext;
import '@vueform/multiselect/themes/default.css'
import { configure } from 'vee-validate';
import AppsbdUtls from "@/libraries/AppsbdUtls";
import reCaptcha from "@/libraries/reCaptcha";
import EventBus from './libraries/emitter';
import './registerServiceWorker'

configure({
    generateMessage: ({ field }) => {
        return  gettext.interpolate(gettext.$gettext('%{fld_name} is not valid'),{fld_name:field});
    },
    bails: true,
    validateOnInput: true,
    validateOnMount:false,
});
router.beforeEach((to,from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        reCaptcha.hide_badge(true);
        if (vitePos.urls.sys_login!='') {
            if(vitePos.is_logged_in){
                next()
            }else{
                window.location.href = vitePos.urls.login_url + "&redirect_to=" + window.location.href;
            }
        }else {
            if (!store.state.isLoggedIn) {
                let q = {};
                q = {redirect: to.fullPath};
                next({
                    name:'Login',
                    query: q
                }) // go to wherever I'm going
            } else {
                next()
            }
        }

    } else {
        next() // does not require auth, make sure to always call next()!

    }
});
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search, position = 0) {
        return this.indexOf(search, position) === position;
    };
}
let app =createApp(App)
    .use(gettext)
    .use(store)
    .use(router)
    .use(PerfectScrollbar)
    .directive('tooltip', VTooltip)
    .directive('close-popper', VClosePopper)
    .component('VDropdown', Dropdown)
    .component('VTooltip', Tooltip)
    .component('VMenu', Menu)
    .use(require('vue3-shortkey'))
    .use(VeeRules,store,gettext)
    .provide("$translate",gettext)
    .use(AppsbdUtls,store,gettext)

    .use(reCaptcha,store,gettext)
    .use(EventBus)
app.mount('#app');
