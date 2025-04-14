import {defineStore} from "pinia";
import {apssbd_admin_url}  from "@/libraries/AppsbdURL";
import axios from "axios";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
import localFilter from "@/libraries/LocalDataFilter";
const module_id="POS_Role";

export const useRoleStore = defineStore('role',{
    state:()=>({
        firstLoaded:false,
        firstAccessLoaded : false,
        accessGridData:null,
        gridData:null,
        resData:{}
    }),
    getters:{
        getRoles(){
            if(this.gridData?.rowdata){
                return this.gridData?.rowdata;
            }
            return [];
        }
    },
    actions: {
        setFirstLoad:async function (status) {
            this.firstLoaded=status;
        },
        getAccessData: async function () {
            return (await axios
                .get(apssbd_admin_url.get_module_url(module_id, "access-data"), {})
                .then(response => {
                    this.firstAccessLoaded = true;
                    this.accessGridData = response.data;
                    return response.data;
                })
                .catch(error => {
                    console.log(error.message);
                    return null;
                }));
        },
        getData: async function (params) {
            let allsrcprops=['name']
            if( this.firstLoaded ){
                //localhost page and search
                return localFilter(this.gridData,params,allsrcprops);
            }else {

                let params2 ={...params};
                params2.limit=500;
                params2.page=1;
                params2.src_by=[];
                params2.sort_by=[];
                return (await AxiosHelper
                    .post(apssbd_admin_url.get_module_url(module_id, "data"), params2)
                    .then(response => {
                        this.firstLoaded = true;
                        this.gridData = response.data;
                        return localFilter(this.gridData,params,allsrcprops);
                    })
                    .catch(error => {
                        console.log(error.message);
                        return null;
                    }));
            }
        },      
        addRole: async function (role_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "add-role"),role_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        resetRole: async function (role_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "reset-role"),role_object)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        copyRole: async function (role_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "copy-role"),role_object)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },

        updateRole: async function (role_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "edit-role"),role_object)
                .then(response => {
                    // this.firstLoaded = true;
                    //  this.gridData = response.data;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        deleteRole: async function (props) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "delete-role"),{id:props.role_id,slug:props.slug})
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        changeRoleStatus: async function (role_obj) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "status-change"),role_obj)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        changePermission: async function (role_obj) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "acl-toggle"),role_obj)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },
        getRoleDetails: async function (role_object) {
            return (await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "role-details"),role_object)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        }


    }

})