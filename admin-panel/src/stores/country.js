import {defineStore} from "pinia";
import axios from "axios";
export const useCountryStore = defineStore('country',{
    state:()=>({
        countries:[],
        timezones:[]
    }),
    getters:{
      /*getCountries(){
          return
      }  */
    },
    actions:{
        async loadCountries(){
            await axios
                .get(vitePos.ajax_url+"&action=apbd-vite-pos-country-list")
                .then(response => {
                   try {
                       this.countries = response.data;
                   }catch (e) {
                       this.countries=[];
                   }
                })
                .catch(error => {
                   this.countries=[];
                });
        },
        async loadTimezone(){
            await axios
                .get(vitePos.ajax_url+"&action=apbd-vite-pos-timezone-list")
                .then(response => {
                    try {
                        this.timezones = response.data;
                    }catch (e) {
                        this.timezones=[];
                    }
                })
                .catch(error => {
                    this.timezones=[];
                });
        }
    }
})