import { createApp } from 'vue'
import Toast,{ POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

import {createGettext} from "@jshmrtn/vue3-gettext"
import VeeRules from "./libraries/AppsbdVeeRules";
const gettext = createGettext(vitePos.translation_obj);
import '@vueform/multiselect/themes/default.css'
import { configure } from 'vee-validate';
import EventBus from './libraries/emitter';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import './assets/css/root.scss'
import './assets/css/style.scss'
import AppsbdUtls from "@/libraries/AppsbdUtls";
import AppsbdURL from "@/libraries/AppsbdURL";
import {VTooltip, VClosePopper, Dropdown, Tooltip, Menu} from 'floating-vue'
import 'floating-vue/dist/style.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createPinia } from "pinia";
import { VueEditor } from "vue3-editor";

import AppsbdWCHelper from "@/libraries/AppsbdWCHelper";


const pinia = createPinia();

configure({
    generateMessage: ({ field }) => {
        return  gettext.interpolate(gettext.$gettext('%{fld_name} is not valid'),{fld_name:field});
    },
    bails: true,
    validateOnInput: true,
    validateOnMount:false,
});
const toast_options = {
    position: POSITION.BOTTOM_RIGHT
};
createApp(App)
    .use(Toast, toast_options)
    .use(pinia)
    .use(PerfectScrollbar)
    .use(router)
    .use(VueSweetalert2)
    .use(VeeRules,gettext)
    .use(VueEditor)
    .provide("$translate",gettext)
    .use(AppsbdUtls,gettext)
    .use(AppsbdWCHelper)
    .use(AppsbdURL,gettext)
    .use(EventBus)
    .directive('tooltip', VTooltip)
    .directive('close-popper', VClosePopper)
    .component('VDropdown', Dropdown)
    .component('VTooltip', Tooltip)
    .component('VMenu', Menu)
    .use(gettext)
    .mount('#AppsbdAdminPanel');
