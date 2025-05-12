import {defineStore} from "pinia";
import {apssbd_admin_url}  from "@/libraries/AppsbdURL";
import axios from "axios";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
const module_id="POS_Dashboard";
export const useDashboardStore = defineStore('dashboard',{
    state:()=>({
        firstLoaded:false,
        analytics:{}
    }),
    getters: {
        total_orders() {
            if (this.analytics?.order_info?.total_order) {
                return this.analytics.order_info.total_order;
            }
            return 0;
        },
        total_amount() {
            if (this.analytics?.order_info?.total_amount) {
                return this.analytics.order_info.total_amount;
            }
            return 0.0;
        },
        total_outlets() {
            if (this.analytics?.order_info?.total_outlets) {
                return this.analytics.order_info.total_outlets;
            }
            return 0;
        },
        total_amount_text() {
            if (this.analytics?.order_info?.total_amount_text) {
                return this.analytics.order_info.total_amount_text;
            }
            return "";
        },
        outlets() {
            if (this.analytics?.order_info?.outlets) {

                return this.analytics.order_info.outlets;
            }
            return [];
        },
        outlets_pie_order() {
            let res = [];
            for (let o of this.outlets) {
                res.push([o.outlet_name, o.total_order]);
            }
            return res;
        },
        outlets_pie_amount() {
            let res = [];
            for (let o of this.outlets) {
                res.push([o.outlet_name, o.total_amount]);
            }
            return res;
        }
    },
    actions: {
        loadData: async function (isForce) {
            if (this.firstLoaded && !isForce) {
                return this.analytics;
            }

            return (await AxiosHelper.get(apssbd_admin_url.get_module_url(module_id, "data"))
                .then(response => {
                    this.analytics = response.data;
                    this.firstLoaded=true;
                    return response.data;
                })
                .catch(error => {
                    return null;
                }));
        },

    }

})