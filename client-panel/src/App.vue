<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="no-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" fill="currentColor"><path d="M10.27,20.48H4a3.81,3.81,0,0,1-4-3.9Q0,10.24,0,3.9A3.82,3.82,0,0,1,4,0H16.52a3.8,3.8,0,0,1,4,4c0,2,0,4.06,0,6.09a1.17,1.17,0,0,0,.28.71,5.54,5.54,0,0,1,1.33,5.65,5.25,5.25,0,0,1-4.25,3.83,17.18,17.18,0,0,1-3,.2c-1.51,0-3,0-4.54,0ZM17.16,9.09v-5c0-.63-.14-.76-.78-.76H4.09c-.58,0-.74.14-.74.71V16.42c0,.61.14.74.76.74h7c.14,0,.28,0,.42,0-.21-.94-.21-.94-1.11-.95-1.82,0-3.64,0-5.46,0-.57,0-.71-.22-.48-.72.63-1.34,1.25-2.68,1.89-4a1.22,1.22,0,0,1,2.22-.24c.35.43.69.87,1,1.3a1.54,1.54,0,0,0,1.33.58.45.45,0,0,0,.5-.34A6.24,6.24,0,0,1,12,11.63,5.74,5.74,0,0,1,17.16,9.09Zm2.6.82V9.36c0-1.74,0-3.48,0-5.22A3.22,3.22,0,0,0,16.41.74C12.28.81,8.15.76,4,.76A3.07,3.07,0,0,0,.76,4c0,4.13,0,8.26,0,12.39a3.22,3.22,0,0,0,3.33,3.32c3.05-.07,6.11,0,9.17,0h.51a18.28,18.28,0,0,1-1.47-1.44,1,1,0,0,0-.86-.39H4a1.24,1.24,0,0,1-1.41-1.31q0-6.34,0-12.68A1.22,1.22,0,0,1,3.92,2.59H16.55A1.26,1.26,0,0,1,17.92,4V9.17Zm1.87,4.87a4.92,4.92,0,1,0-4.94,4.92A4.91,4.91,0,0,0,21.63,14.78Zm-10.56-.93a2.59,2.59,0,0,1-2.41-1.3,8.84,8.84,0,0,0-.6-.77c-.46-.59-.77-.57-1.09.1-.51,1-1,2.11-1.5,3.17a2.69,2.69,0,0,0-.12.34h5.72Z"/><path d="M10.25,8.9A2.26,2.26,0,0,1,8,6.66,2.3,2.3,0,0,1,10.24,4.3a2.34,2.34,0,0,1,2.32,2.28A2.3,2.3,0,0,1,10.25,8.9ZM11.8,6.59a1.53,1.53,0,0,0-1.56-1.52A1.54,1.54,0,0,0,8.7,6.63a1.59,1.59,0,0,0,1.57,1.54A1.57,1.57,0,0,0,11.8,6.59Z"/><path d="M16.68,14.28l2-2L19,12c.18-.19.39-.33.62-.11s.11.44-.08.64l-1.69,1.68c-.19.19-.38.36-.64.6l2.08,2c.11.1.26.19.3.32a2.06,2.06,0,0,1,0,.56c-.18,0-.44,0-.55-.06-.42-.36-.8-.77-1.19-1.16L16.7,15.27l-2,2c-.09.09-.17.23-.28.26a4.29,4.29,0,0,1-.64.09c0-.2,0-.47.12-.59.59-.64,1.22-1.25,1.85-1.87a4.22,4.22,0,0,1,.48-.4l-2.15-2.12c-.08-.08-.2-.15-.23-.24a3.55,3.55,0,0,1-.06-.57c.2,0,.47,0,.58.07.65.59,1.26,1.22,1.88,1.85C16.39,13.92,16.51,14.08,16.68,14.28Z"/></symbol>
  </svg>
  <div v-if="!app_login_loader" class="container-fluid" v-shortkey="{f1:['f1'],f6: ['f6'], f7: ['f7'],f11: ['f11']}" @shortkey="theAction">
    <div id="ad-global-loader" v-if="isShowGlobalLoader" class="ad-global-loader">
      <app-loader class="v-align-m" :msg="getShowGlobalMessage" />
    </div>
    <app-wrapper>
      <div class="user-locked-panel outlet-panel" v-if="isUserLoggedIn && !showChangePass && !this.getCurrentPlace.is_submitted && !isShowGlobalLoader" >
        <choose-outlet-panel />
      </div>
      <div class="main-container no-menu" v-if="isUserLoggedIn && !isShowGlobalLoader " :class="mainContainerCssClass()+(this.$route.path == '/customer-view'?'no-menu':'')">
        <div class="main-body" :class="isUptoTab?'small-devices':''">
          <RouterView @click="click_on_router_view($event)"  />
        </div>
      </div>
      <div class="main-container " v-if="!isUserLoggedIn " :class="mainContainerCssClass()">
        <div class="main-body" :class="isUptoTab?'small-devices':''">
          <RouterView @click="click_on_router_view($event)"  />
        </div>
      </div>
    </app-wrapper>
  </div>
  <div v-if="app_login_loader" class="ad-global-loader">
      <app-loader class="v-align-m" :msg="getShowGlobalMessage" />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import useBreakpoint from "./libraries/Responsive";
import AppLoader from "@/components/AppLoader";
import AppWrapper from "./components/AppWrapper";
import ChooseOutletPanel from "@/components/ChooseOutletPanel.vue";
export default {
  components: {
    ChooseOutletPanel,
    AppWrapper,
    AppLoader,
  },
  props: {
    msg: String
  },
  data() {
    return {
      heart_bit_timer: null,
      sync_order_timer: null,
      sync_product_timer: null,
      getMsg:'',
      showHelpModal:false,
      showNotiDetails:false,
      data:{},
      app_login_loader:false,
      audioEnabled:false
    };
  },
  async created() {
    this.$store.commit('v_init');
  },
  mounted() {
    document.addEventListener('click', this.click_on_router_view);
    const thisObj=this;
    this.$eventBus.$on("outlet-ready",function(){
      thisObj.call_if_logged_in();
    });
    this.showMenu();
    this.$store.dispatch('LoadSettings',function(){});
    this.checkLoggedIn(thisObj.call_if_logged_in);
    this.$eventBus.$on('callAfterLogin',thisObj.afterLogin);

    if (false && this.isUptoTab)
    {
      this.$store.state.hideMenuBar=true;
    }
  },
  unmounted() {
    try {
      clearInterval(this.sync_order_timer);
    } catch (e) {}
    try {
      clearInterval(this.sync_product_timer);
    } catch (e) {}
    try {
      clearInterval(this.heart_bit_timer);
    } catch (e) {}
  },
  computed: {
    ...mapGetters([
      'getShowGlobalMessage',
      'isShowGlobalLoader',
      'isShow',
      'isUserLoggedIn',
      'getHideMenu',
      'getCurrentPlace',
      'showChangePass',
      'product_sync_intval',
      'order_sync_intval',
    ])
  },
  setup(){
    const {isUptoTab}=useBreakpoint();
    return {
      isUptoTab
    }

  },
  methods:{
    showMenu(){
      if (this.getHideMenu==null)
      {
        if (false && this.isUptoTab)
        {
          this.$store.state.hideMenuBar=true;
        }else {
          this.$store.state.hideMenuBar=false;
        }
      }
    },
    checkLoggedIn(callBack)
    {
      const thisobj=this;
      if (!this.isUserLoggedIn)
      {
        if(vitePos.wcnonce ) {
          thisobj.app_login_loader=true
          const checkLoginCallback = (data) => {
            thisobj.afterLogin();
            thisobj.app_login_loader=false;
            callBack();
          }
          this.$store.dispatch('check_login',checkLoginCallback);
        }else{
          callBack();
        }
      }else{
        callBack();
      }

    },
    click_on_router_view(e){
      this.$eventBus.$emit('outside-clicked',e);
    },
    heart_bit(){
      if (this.isUserLoggedIn)
      {
        this.$store.dispatch('heart_bit');
      }
    },
    mainContainerCssClass(){
        return ((this.isShow)?'main-blur-screen':'')+(this.getHideMenu?' hide-menu ':'')+(this.$route.name=='Login'?'hide-menu':'');
    },
    async afterLogin() {
      if (this.isUserLoggedIn) {
        this.$router.replace(this.$route.query.redirect || '/');
          const initialCallback = (status) => {
            this.$store.commit('SetLoadingStatus', {status: false, msg: "Loaded"});
            if (status) {
              this.callHeartbeat();
            }
          }
      }
    },
    call_if_logged_in() {},
    theAction(event) {
      switch (event.srcKey) {
        case 'f1':
          this.$store.state.showHelpModal = true;
          break;
        case 'f6':
          if (this.$isRestaurant())
          {
            this.$router.push('/waiter');
          }else {
            this.$router.push('/');
          }
          this.$eventBus.$emit('fcs', event);
          break;
        case 'f7':
          this.$router.push('/check-out');
          break;
        case 'f11':
          this.$appsbdUtls.makeFullscreen(event);
          break;
        default:
      }
    },
  }
}
</script>
<style>

</style>
