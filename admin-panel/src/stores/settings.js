import {defineStore} from "pinia";
import {apssbd_admin_url}  from "@/libraries/AppsbdURL";
import axios from "axios";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
const module_id="POS_Settings";
export const useSettingsStore = defineStore('settings',{
    state:()=>({
        firstLoaded:false,
        appOptions:{}
    }),
    getters:{
        pages(){
            if (this.appOptions?.pages) {
                return this.appOptions.pages;
            }
            return [];
        },
        default_link(){
            if (this.appOptions?.pos_link) {
                return this.appOptions.pos_link;
            }
            return '';
        },
        login_ph(){
            if (this.appOptions?.pos_login_ph) {
                return this.appOptions.pos_login_ph;
            }
            return '';
        },
        license_info(){
            if (this.appOptions?.license_info) {
                return this.appOptions.license_info;
            }
            return null;
        }
    },
    actions: {
        loadSettings: async function () {
            if(this.firstLoaded){
                return this.appOptions;
            };
            return (await AxiosHelper.get(apssbd_admin_url.get_module_url(module_id, "get-option"))
                .then(response => {
                    if(response.status) {
                        try {
                            this.firstLoaded = true;
                            this.appOptions = response.data?.data;
                        }catch (e){}
                    }
                     return this.appOptions;
                })
                .catch(error => {
                    return null;
                }));
        },
        getCustomers: async function ( searchKey){
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "customers"), searchKey,true)
                .then(response => {
                    return response.data.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        updateSettings: async function (options) {
            if (options.pos_customer==null)
            {
                options.pos_customer="";
            }
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "option"), options,true)
                .then(response => {
                    this.appOptions = response.data?.data;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        refreshApp: async function () {
            return (await AxiosHelper.get(apssbd_admin_url.get_module_url(module_id, "refresh-app"))
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        updateInvoiceSettings: async function (options) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "invoice-settings"), options,true)
                .then(response => {
                    this.appOptions = response.data?.data;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
    }

})
