import {defineStore} from "pinia";
import {apssbd_admin_url}  from "@/libraries/AppsbdURL";
import axios from "axios";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
const module_id="POS_Warehouse";
export const useOutletStore = defineStore('outlet',{
    state:()=>({
        loadkey:null,
        gridData:null,
        resData:{}
    }),
    getters:{
        /*getCountries(){
            return
        }  */
    },
    actions: {
        disableCache:async function (response) {
            if(response.status) {
                this.loadkey = null;
            }
        },
        getData: async function (params) {
            let uniqueId=AxiosHelper.crc32(params);
            if(this.loadkey && uniqueId==this.loadkey){
                return this.gridData;
            }
            return (await AxiosHelper
                .post(apssbd_admin_url.get_module_url(module_id, "data"), params)
                .then(response => {
                    this.loadkey = uniqueId;
                    this.gridData = response.data;
                    return this.gridData;
                })
                .catch(error => {
                    return null;
                }));
        },
        addCounter: async function (counter_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "counter-add"), counter_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        updateCounter: async function (counter_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "counter-edit"),counter_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        addOutlet: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "add-outlet"),outlet_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        updateOutlet: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "edit-outlet"),outlet_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        deleteOutlet: async function (id) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "delete-outlet"),{id:id})
                .then(response => {
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        changeMainBranch: async function (outlet_obj) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "main-branch"),outlet_obj)
                .then(response => {
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        deleteCounter: async function (id) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "counter-delete"),{id:id})
                .then(response => {
                    this.disableCache(response.data);
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        getCounterDetails: async function (counter_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "counter-details"),counter_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        getOutletDetails: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "outlet-details"),outlet_object)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        getUserList: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "outlet-user-list"),outlet_object)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return null;
                }));
        },
        removeUserFromOutlet: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "remove-outlet-user"),outlet_object)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return null;
                }));
        },
        addUsertoOutlet: async function (outlet_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "add-outlet-user"),outlet_object)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return null;
                }));
        },


    }

})