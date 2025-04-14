import AppsbdUtls from "@/libraries/AppsbdUtls";
const apssbd_admin_url={
    get_plugin: function (action) {
        let actionStr = window.vitePos.base_slug + '-' + action;
        actionStr = actionStr.toLowerCase().replace("_", "-");
        return window.vitePos.ajax_url + '&action=' + actionStr;
    },
    get_module_url: function (module_id, action) {
        let actionStr = vitePos.base_slug + '-m-' + module_id + '-' + action;
        actionStr = actionStr.toLowerCase().replace("_", "-");
        return vitePos.ajax_url + '&action=' + actionStr;
    }
}

const AppsbdURL = {
    install(Vue,translate) {
        Vue.config.globalProperties.$appsbdURL = apssbd_admin_url;
    },
}
export {apssbd_admin_url};
export default AppsbdURL;