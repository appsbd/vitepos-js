<template>
  <div id="appsbd-app" class="">

    <div class="card">
      <div class="card-body p-0">
          <div  class="app-container " :class="isMiniMenu?'mini-menu':''">
    <div v-if="isMenuBar" class="app-side-menu">
      <div class="xs-menu-toggler">
        <svg @click="toggleMenu" fill="none" stroke="currentColor"   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <use fill="none" stroke="currentColor" href="#icon-menu-bars" />
        </svg>
      </div>
      <div class="apbd-app-logo apbd-ignore-dm">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 373.68 408.61">
          <defs>
            <linearGradient id="linear-gradient" x1="71.07" y1="411.08" x2="277.67" y2="204.49" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="var(--apbd-logo-shape-bg1)"/>
              <stop offset="1" stop-color="var(--apbd-logo-shape-bg2)"/>
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="258.39" y1="103.58" x2="333.55" y2="28.41" xlink:href="#linear-gradient"/>
            <linearGradient id="linear-gradient-3" x1="276.9" y1="113.69" x2="370.67" y2="19.92" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="var(--apbd-logo-shape-bg3)"/>
              <stop offset="1" stop-color="var(--apbd-logo-shape-bg2)"/>
            </linearGradient>
            <linearGradient id="linear-gradient-4" x1="94.71" y1="424.32" x2="202.39" y2="316.64" xlink:href="#linear-gradient-3"/>
            <linearGradient id="linear-gradient-5" x1="95.09" y1="424.7" x2="202.77" y2="317.01" xlink:href="#linear-gradient-3"/>
            <linearGradient id="linear-gradient-6" x1="-22.7" y1="219.18" x2="168.75" y2="27.73" xlink:href="#linear-gradient-3"/>
            <linearGradient id="linear-gradient-7" x1="49.52" y1="337.17" x2="315.8" y2="70.89" gradientTransform="translate(194.74 -76.71) rotate(45)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="var(--apbd-logo-shape-bg1)"/>
              <stop offset="1" stop-color="var(--apbd-logo-shape-bg2)"/>
            </linearGradient>
            <linearGradient id="linear-gradient-8" x1="279.71" y1="327.63" x2="376.55" y2="230.79"
                            gradientTransform="translate(72.27 -68.75) rotate(13.28)" xlink:href="#linear-gradient-3"/>
            <linearGradient id="linear-gradient-9" x1="63.91" y1="136.49" x2="63.91" y2="87.63"
                            xlink:href="#linear-gradient"/>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="BACKGROUND2">
              <path class="lbc-1"
                    d="M75.23,406.93h0a5.76,5.76,0,0,1,0-8.13L190.91,283.13a5.73,5.73,0,0,1,8.12,0h0a5.75,5.75,0,0,1,0,8.12L83.36,406.93A5.76,5.76,0,0,1,75.23,406.93Z"/>
              <path class="lbc-2"
                    d="M273,89h0a4.83,4.83,0,0,1,0-6.84l29-29a4.83,4.83,0,0,1,6.84,0h0a4.83,4.83,0,0,1,0,6.84l-29,29A4.83,4.83,0,0,1,273,89Z"/>
              <path class="lbc-3"
                    d="M291.45,99.14h0a4.86,4.86,0,0,1,0-6.85L344,39.8a4.83,4.83,0,0,1,6.84,0h0a4.83,4.83,0,0,1,0,6.84L298.3,99.14A4.85,4.85,0,0,1,291.45,99.14Z"/>
              <path class="lbc-4"
                    d="M120.07,399h0a5.73,5.73,0,0,1,0-8.12l7.16-7.17a5.76,5.76,0,0,1,8.13,0h0a5.76,5.76,0,0,1,0,8.13L128.19,399A5.73,5.73,0,0,1,120.07,399Z"/>
              <path class="lbc-5"
                    d="M140.78,379h0a5.76,5.76,0,0,1,0-8.13l63.82-63.82a5.76,5.76,0,0,1,8.13,0h0a5.76,5.76,0,0,1,0,8.13L148.91,379A5.76,5.76,0,0,1,140.78,379Z"/>
              <path class="lbc-6 "
                    d="M98.24,0a98.24,98.24,0,1,0,98.24,98.24A98.24,98.24,0,0,0,98.24,0Zm0,190.21a92,92,0,1,1,92-92A92,92,0,0,1,98.24,190.21Z"/>
              <circle class="lbc-7 lbc-spin" cx="189.97" cy="196.72" r="154.68" transform="translate(-83.46 191.95) rotate(-45)"/>
              <circle class="lbc-8 " cx="331.38" cy="275.96" r="42.31" transform="translate(-54.54 83.52) rotate(-13.28)"/>
              <circle class="lbc-9 " cx="63.91" cy="112.06" r="24.43"/>
            </g>
          </g>
        </svg>
        <slot name="app-logo"></slot>
      </div>
<!--      <div class="divider-after"></div>-->
      <div class="app-side-menu-main" @click="xsMenuClicked">
        <perfect-scrollbar>
         <slot name="main-menu"></slot>
        </perfect-scrollbar>
      </div>
      <div v-if="!isHideMenuFooter" class="app-menu-footer">
        <slot name="menu-footer"></slot>
      </div>
    </div>
    <div class="app-content-wrapper">
      <div v-if="isContentHeader" class="app-content-header">
        <div class="app-header-left">
          <svg @click="toggleMenu" fill="none" stroke="currentColor"   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <use fill="none" stroke="currentColor" width="24" height="24" href="#icon-menu-bars" />
          </svg>
        </div>

        <div class="app-header-middle">
          <div class="app-header-middle-left">
            <slot name="app-content-header"></slot>
          </div>

          <div class="app-header-middle-right">
            <slot name="app-header-right"></slot>
          </div>
        </div>
        <div class="app-header-right pe-3">

          <div class="form-check  form-switch dark-switch form-switch-sm">
            <input class="form-check-input" @change="$appsbdUtls.ChangeDarkmode(this.isDarkmode)" v-model="isDarkmode" type="checkbox">
          </div>
        </div>

      </div>
      <div class="app-content-body">
        <slot name="app-body"></slot>
      </div>
      <div class="app-content-footer">
        <span class="apbd-cp">Vitepos</span>
        <span class="app-version"><translate>Version</translate>:0.0.0</span>
      </div>
    </div>
    <div v-if="isRightSidebar" class="app-sidebar-right">
      test
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import useBreakpoint from "@/libraries/Responsive";

export default {
  name: 'AppContainer',
  components:{
    PerfectScrollbar
  },
  props: {
    appUniqueId:{
      type:String,
      default:"apbd"
    },
    isMenuBar:{
      type:Boolean,
      default:true
    },
    isContentHeader:{
      type:Boolean,
      default:true
    },
    isRightSidebar:{
      type:Boolean,
      default:false
    },
    isHideMenuFooter:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      isMiniMenu:false,
      isDarkmode:false
    }
  },
  created() {
   this.setInitialMenuStatus();
  },
  setup(){
    const {ScreenWidth,ScreenType}=useBreakpoint();
    return {
      ScreenWidth,
      ScreenType
    }
  },
  methods: {
    setInitialMenuStatus() {
      if (this.ScreenType == 'xs') {
        this.isMiniMenu = true;
      } else {
        this.isMiniMenu=this.getMiniMenuStatus();

      }
      // this.updateMenuStatus();
    },
    xsMenuClicked() {
      if (this.ScreenType == 'xs') {
        this.toggleMenu();
      }
    },
    toggleMenu() {
      this.isMiniMenu = !this.isMiniMenu;
      this.updateMenuStatus();
    },
    updateMenuStatus() {
      localStorage.setItem(this.appUniqueId + "_mn", this.isMiniMenu);
    },
    getMiniMenuStatus() {
      let v = localStorage.getItem(this.appUniqueId + "_mn");
      try {
        return (v.toLowerCase() === 'true');
      }catch (e){
        return false;
      }
    }
  },

}
</script>
<style scoped lang="scss">
.lbc-1{fill:url(#linear-gradient);}
.lbc-2{
  fill:url(#linear-gradient-2);

}
.lbc-3{fill:url(#linear-gradient-3);}
.lbc-4{fill:url(#linear-gradient-4);}
.lbc-5{fill:url(#linear-gradient-5);}
.lbc-6{fill:url(#linear-gradient-6);}
.lbc-7{fill:url(#linear-gradient-7);
}
.lbc-8{fill:url(#linear-gradient-8);}
.lbc-9{fill:url(#linear-gradient-9);}
.lbc-spin{
  animation: pulse 4s linear infinite;
}
@media only screen and (max-width: 600px) {
  .app-header-middle{
    display: none;
  }
}
</style>
