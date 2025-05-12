import { createStore } from 'vuex'
import axios from "axios";
import VitePosDataPersist from './vite-pos-data-persist.js';
import createPersistedState from 'vuex-persistedstate'
import router from '../router'
import store from '../store'
import reCaptcha from "@/libraries/reCaptcha";
import createMultiTabState from 'vuex-multi-tab-state';
import VTAxios from "@/libraries/ViteposAxiosHelper";
import axios_headers from "@/store/axios_headers";

axios.interceptors.response.use(function (response,state) {
  return response;
}, function (error) {
  if (error.response && 401 === error.response.status || error.response.status===403) {
    store.commit('setLogout',store.state);
    router.push('/login');
  } else {
    return Promise.reject(error);
  }
});
export default createStore({
  state: {
    showChangePass:false,
    wifiStatus:navigator.onLine,
    isMenuCollapse:false,
    isShowGlobalLoader:false,
    getIsFullScreen:false,
    showHelpModal:false,
    globalLoaderCurrentMessage:'Loading',
    Outlets:{},
    allOutlets:[],
    temp_cartId:1,
    counter:[],
    currentPlace:{
                  outlet:null,
                  counter:null,
                  is_new:false,
                  cd_balance:0.00,
                  is_submitted:false,
                },
    showCdCloseBtn:false,
    loggedUserData:{},
    isUserLocked:false,
    lockedUser:{},
    settings:null,
    isLoggedIn:false,
    hideMenuBar:null,
    isShow:false,
  },

  getters:{
    getHideMenu:state => {
      return state.hideMenuBar;
    },
    getBasicSettings:state=>{
      try {
        return state.settings.settings.basic_settings;
      }catch (e)
      {
        return null;
      }
    },
    getOutlets:state=>{
      return state.Outlets;
    },
    showChangePass:(state)=>{
      try {
        if (state.loggedUserData?.is_temp_pass=='Y')
        {
          return true;
        }else {
          return false;
        }
      }catch (e){
        console.log(e.message);
        return false;
      }
    },
    isSingleDrawer(state){
      if (ACL.checkACL('apbd-wp-login')!=undefined)
      {
        return state.settings.settings.basic_settings.single_cash_drawer=='Y';
      }else {
        return false;
      }
    },
    getCurrentPlace:state => {
      try {
        return state.currentPlace;
      }catch (e){
        return {};
      }
    },
    getLoggedUserData(state) {
      return state.loggedUserData;
    },
    getLockedUser(state) {
      return state.lockedUser;
    },
    isUserLocked:state=>{
      return state.isUserLocked;
    },
    isUserLoggedIn:state=>{
      return state.isLoggedIn;
    },
    isShow:state=>{
      return state.isShow;
    },
    isShowGlobalLoader:state=>{
      return state.isShowGlobalLoader;
    },
    getShowGlobalMessage:state=>{
      try {
        return state.globalLoaderCurrentMessage;
      }catch (e) {
        return "";
      }

    },
    getSettings:state=>{
      return state.settings;
    },
    isPartialOffline: state => {
      let isOfflineSale=false;
      try {
        isOfflineSale = state.settings.settings.basic_settings.offline_order_status == 'Y';
      }catch (e) {}

      return !state.wifiStatus && isOfflineSale;
    },
    getIsRtl:state=>{
      try {
        return state.settings.settings.basic_settings?.enabled_rtl=='Y';
      }catch (e)
      {
        return false;
      }
    },
  },
  mutations: {
    v_init(state) {

      //state.currentCart=new CartData();
      state.isLoggedIn = false;
      if (state.isUserLocked) {
        store.commit('setLogout', store.state);
      }
      state.isUserLocked = false;
      state.isShow = false;
      state.isShowGlobalLoader = false;
      state.showCdCloseBtn = false;
      var sesData = sessionStorage.getItem(vitePos.ca_prefix + 'user_data');
      if (sesData) {
        try {
          state.loggedUserData = JSON.parse(sesData);
          if (state.loggedUserData.wp_rest_nonce) {
            state.isLoggedIn = true;
          }
        } catch (e) {
        }
        var CD_place = sessionStorage.getItem(vitePos.ca_prefix + 'current_place');
        if (CD_place) {
          state.currentPlace = JSON.parse(CD_place);
        }
      } else {
        if (!state.isUserLocked) {
          state.currentPlace.is_submitted = false;
        }
      }
    },
    setLogout(state) {
      sessionStorage.removeItem(vitePos.ca_prefix + 'user_data');
      sessionStorage.removeItem(vitePos.ca_prefix + 'current_place');
      state.isLoggedIn = false;
      state.temp_cartId = 1;
      state.isShowGlobalLoader = false;
      state.showCdCloseBtn = false;
      state.loggedUserData = null;
      state.outlets = [];
    },
    setUserLocked(state) {
      try {
        sessionStorage.removeItem(vitePos.ca_prefix + 'user_data');
        state.isLoggedIn = false;
        state.isUserLocked = true;
        state.lockedUser = state.loggedUserData;
        state.loggedUserData = null;
      } catch (e) {
        store.commit('setLogout', store.state);
      }
    },
    setUserLockedStatus(state, status) {
      state.isUserLocked = status;
    },
    async setLoginSessionData(state, logged_user_data) {
      state.isLoggedIn = true;
      state.loggedUserData = logged_user_data;

      state.isUserLocked = false;
      state.lockedUser = null;
      sessionStorage.setItem(vitePos.ca_prefix + 'user_data', JSON.stringify(state.loggedUserData));
    },
    updateLoggedUser(state, logged_user_data) {
      state.loggedUserData.wp_rest_nonce = logged_user_data.wp_rest_nonce;
      state.loggedUserData.is_temp_pass = logged_user_data.is_temp_pass;
      sessionStorage.setItem(vitePos.ca_prefix + 'user_data', JSON.stringify(state.loggedUserData));
    },
    toggleMenu(state) {
      state.isMenuCollapse = !state.isMenuCollapse;
    },
    SetShowMenu(state) {
      state.showLeftMenu = !state.showLeftMenu;
    },
    SetOutlets(state, Outlets) {
      state.Outlets = Outlets
    },
    SetAllOutlet(state, Outlets) {
      state.allOutlets = Outlets;
    },
    async SetCurrentOutlet(state, data) {
      sessionStorage.setItem(vitePos.ca_prefix + 'current_place', JSON.stringify(data));
      let sesData = sessionStorage.getItem(vitePos.ca_prefix + 'current_place');
      let syncTimer = null;
      state.currentPlace = JSON.parse(sesData);
      let previous_outlet = null;
      try {
        previous_outlet = state.currentPlace.outlet;
      } catch (e) {
        previous_outlet = null;
      }
      if (state.currentPlace.is_submitted) {
        if (previous_outlet && state.currentPlace.outlet != previous_outlet) {
          this.dispatch('ProductSync', {force: true});
        } else {
          this.dispatch('ProductSync');
        }
      }
    },

    SetLoadingStatus(state, obj) {
      state.isShowGlobalLoader = obj.status;
      state.globalLoaderCurrentMessage = obj.msg;
    },
    SetCountries(state, countries) {
      state.countries = countries;
    },
    async SetSettings(state, settings) {
      let prePosMode = state.settings?.settings?.basic_settings?.pos_mode;
      let preStockMode = state.settings?.settings?.basic_settings?.stock_type;
      state.settings = settings;
      if (preStockMode && preStockMode != settings?.settings?.basic_settings.stock_type) {
        if (router.currentRoute?.value?.path == '/manage-stock/receive' || router.currentRoute?.value?.path == '/manage-stock/transfer') {
          router.push('/manage-stock/stock');
        }
      }
      if (prePosMode && prePosMode != settings?.settings?.basic_settings.pos_mode) {
        state.settings.settings.basic_settings.pos_mode = settings?.settings?.basic_settings.pos_mode;
        this.dispatch('userLogOut', {
          msg: 'POS Mode Changed, Re-login Required..', callback: () => {
            store.commit('setLogout', store.state);
            router.push('/login');
          }
        });
        return;
      }

      try {
        if (state.settings.settings.basic_settings?.is_rc_v3 && state.settings.settings.basic_settings?.rc_v3_site_key) {
          reCaptcha.loadCaptcha(state.settings.settings.basic_settings.rc_v3_site_key);
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    SetHeartBitSyncId(state, app_sync_id) {
      state.app_sync_id = app_sync_id;
    }
  },
  actions: {
    v_init(context, callback) {
      context.commit('v_init');
      callback();
    },
    toggleMenu(context) {
      context.commit('toggleMenu');
    },
    ShowMenu(context) {
      context.commit('SetShowMenu');
    },
    LoadOutletList(context, callback) {
      if (!callback) {
        callback = function () {
        }
      }
      VTAxios.get(vitePos.urls.outlet_list, axios_headers(context.state))
          .then(response => {
            context.commit('SetOutlets', response.data.rowdata);
            callback();
          })
          .catch(error => {
            console.log(error.message);
            callback();
          });
    },
    GetOutletList(context,callback) {
      if (!callback) {
        callback = function () {
        }
      }
      if (!context.state.wifiStatus || !context.state.isLoggedIn) {
        callback();
        return ;
      }
      VTAxios.get(vitePos.urls.all_outlet_list, axios_headers(context.state))
          .then(response => {
            context.commit('SetAllOutlet',response.data.rowdata);
            callback();
          })
          .catch(error => {
            console.log(error.message);
            callback();
          });
    },
    CashDrawerInfo(context, callback) {
      if (!callback) {
        callback = function () {
        }
      }
      if (!context.state.currentPlace.is_submitted){
        callback();
        return ;
      }
      VTAxios.get(vitePos.urls.cash_drawer_info, axios_headers(context.state))
          .then(response => {
            //context.commit('SetOutlets', response.data.rowdata);
            callback(response.data.status,response.data.msg,response.data.data);
          })
          .catch(error => {
            console.log(error.message);
            callback();
          });
    },
    getCashDrawerLog(context, payload) {
      if (!payload.callback) {
        payload.callback = function () {
        }
      }
      if (!context.state.isLoggedIn){
        payload.callback();
        return ;
      }
      VTAxios.post(vitePos.urls.cash_drawer_log,payload.param, axios_headers(context.state))
          .then(response => {
            payload.callback(response.data.status,response.data.msg,response.data.data);
          })
          .catch(error => {
            console.log(error.message);
            payload.callback();
          });
    },
    LoadCountries(context, callback) {
      context.commit('SetLoadingStatus', {status: true, msg: "Countries Loading"});
      VTAxios.get(vitePos.urls.country_list, axios_headers(context.state))
          .then(response => {
            context.commit('SetCountries', response.data.data);
            callback();
          })
          .catch(error => {
            console.log(error.message);
          });
    },
    LoadSettings(context, callback) {
      if (!callback) {
        callback = function () {
        }
      }
      let callbacksend = false;
      if(context.state.isLoggedIn && context.state.settings != null) {
        context.commit('SetLoadingStatus', {status: false});
        callback();
        callbacksend = true;
      }
      if (!callbacksend) {
        context.commit('SetLoadingStatus', {status: true, msg: "Settings Loading"});
      }
     VTAxios.get(vitePos.urls.settings, axios_headers(context.state))
          .then(response => {
            if (response?.status)
            {
              context.commit('SetSettings', response.data.data);
            }
            if(!callbacksend) {
              context.commit('SetLoadingStatus', {status: false});
              callback();
            }
          })
          .catch(error => {
            console.log(error);
            if(!callbacksend) {
              context.commit('SetLoadingStatus', {status: false});
              callback();
            }
          });
    },
    userLogin(context, payload) {
      if (!payload.callback) {
        payload.callback = function (status, msg) {
        }
      }
      if (!payload.login_form) {
        payload.callback(false, 'Data missing');
        return;
      }
      context.commit('v_init');
      if(!context.state.wifiStatus){
        payload.callback(false, 'Your are not connected to the internet.',null);
      }else{
        VTAxios.post(vitePos.urls.user_login, payload.login_form, axios_headers(null))
            .then(async response => {
              try {
                if (response.data.status) {

                  try {
                    if (response.data.data.wp_rest_nonce) {
                      window.vitePos.wcnonce = response.data.data.wp_rest_nonce;
                    }
                  }catch (e) {
                    console.log(e.message);
                  }
                 await context.commit('setLoginSessionData', response.data.data);
                 await context.commit('SetOutlets', response.data.data.outlets);
                  payload.callback(response.data.status, response.data.msg, response.data.data);
                }else {
                  payload.callback(false, response.data.msg, null);
                }
              } catch (e) {
                payload.callback(false, e.message, null);
              }
            })
            .catch(error => {
              payload.callback(false, error.message, null);
            });
      }
    },
    lockUserLogin(context, payload) {
      if (!payload.callback) {
        payload.callback = function (status, msg) {
        }
      }
      if (!payload.login_form) {
        payload.callback(false, 'Data missing');
        return;
      }
      if(!context.state.wifiStatus){
        payload.callback(false, translate('Your are not connected to the internet.'),null);
      }else{
        VTAxios.post(vitePos.urls.user_login, payload.login_form, axios_headers(null))
            .then(async response => {
              try {
                if (response.data.status) {
                  try {
                    if (response.data.data.wp_rest_nonce) {
                      window.vitePos.wcnonce = response.data.data.wp_rest_nonce;
                    }
                  }catch (e) {
                    console.log(e.message);
                  }
                 await context.commit('setLoginSessionData', response.data.data);
                 await context.commit('SetOutlets', response.data.data.outlets);
                  payload.callback(response.data.status, response.data.msg, response.data.data);
                }else {
                  payload.callback(false, response.data.msg, null);
                }
              } catch (e) {
                payload.callback(false, e.message, null);
              }
            })
            .catch(error => {
              payload.callback(false, error.message, null);
            });
      }
    },

    selectOutletPanel(context, payload) {
      VTAxios.post(vitePos.urls.outlet_panel, payload.Outlet, axios_headers(context.state))
          .then(response => {
            try {
              //context.commit('SetCurrentOutlet', response.data.data);
              payload.callback(false, "invalid response");
            } catch (e) {
              payload.callback(false, e.message, null);
            }
          })
          .catch(error => {
            payload.callback(false, error, null);
          });
    },
  async userLogOut(context, payload) {
      let msg=payload?.msg?payload.msg:"Loading...";
      await context.commit('SetLoadingStatus', {status: true, msg: msg});
      VTAxios.get(vitePos.urls.user_logout, axios_headers(context.state))
          .then(async response => {
            await context.commit('setLogout');
            await context.commit('SetLoadingStatus', {status: false, msg: ""});
            if (response.data.status) {
              payload.callback(response.data.status, response.data.msg);
            }
          })
          .catch(error => {
            payload.callback(false, error);
          });
    },

    getCurrentUser(context, payload) {
      if (!context.state.isLoggedIn){
        payload.callback(false,'',null);
        return ;
      }
      VTAxios.get(vitePos.urls.current_user, axios_headers(context.state))
          .then(response => {
            payload.callback(response.data.status, response.data.msg, response.data.data)
          });
    },
    heart_bit(context) {
      if (!context.state.currentPlace.is_submitted){
        return ;
      }
      if (context.state.wifiStatus ) {
        VTAxios.get(vitePos.urls.heart_bit, axios_headers(context.state))
            .then(response => {
              if (response.data.status) {
                context.commit('SetSettings', response.data.data);
                if(context.getters.isUserLoggedIn) {
                  try {
                    if (response.data.data.sync_id) {
                      context.commit('SetHeartBitSyncId', response.data.data.sync_id);
                    }
                  } catch (e) {
                  }
                  this.dispatch('ProductSync');
                }
              }
            }).catch(error => {
          console.log(error);
        });
      }
    },
   async check_login(context, callback) {
      if (!callback) {
        callback = function (data) {
        }
      }
      let resp = await VTAxios.get(vitePos.urls.get_logged_user, axios_headers(context.state))
          .then(async response => {
            if (response.data.status) {
              await context.commit('setLoginSessionData', response.data.data);
              await context.commit('SetOutlets', response.data.data.outlets);
            }
            callback(response.data);
          }).catch(error => {
            console.log(error.message);
          callback(null);
      });
    }
  },
  plugins: [createPersistedState({key:vitePos.ca_prefix+'viteposx'}),VitePosDataPersist(),
   createMultiTabState({key:vitePos.ca_prefix+'mtvt'})
  ],//,createMultiTabState()
})
