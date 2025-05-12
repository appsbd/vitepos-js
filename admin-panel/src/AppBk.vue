<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-menu-bars"  viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </symbol>
  </svg>
  <div class="container-fluid mt-3">
    <AppContainer :is-min="isMinMenu" app-unique-id="vtpos">
      <template v-slot:app-logo>
        <router-link to="/" class=" link-dark text-decoration-none">
          <img :src="$appsbdUtls.getAppLogo()" alt="">
          <span class="fs-4 apbd-app-title" v-translate>Sidebar</span>
        </router-link>
      </template>
      <template v-slot:main-menu>
        <ul class="apbd-main-menu" @click="">

          <li>
            <router-link to="/" exact class="">
              <i class="abi  abi-display"></i>
              <span class="apbd-menu-title" v-translate>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="">
              <i class="abi  abi-airplay"></i>
              <span class="apbd-menu-title" v-translate>Orders</span>
            </router-link>
          </li>
          <li>
            <router-link to="/roles" class="">
              <i class="vps vps-users"></i>
              <span class="apbd-menu-title" v-translate>Roles</span>
            </router-link>
          </li>
          <li>
            <router-link to="/outlet" class="">
              <i class="vps vps-shop"></i>
              <span class="apbd-menu-title" v-translate>Outlet</span>
            </router-link>
          </li>
          <li>
            <router-link to="/setting" class="">
              <i class="vps  vps-settings"></i>
              <span class="apbd-menu-title" v-translate>Settings</span>
            </router-link>
          </li>
          <li class="">
            <a href="#" aria-current="page" data-bs-toggle="collapse"
               data-bs-target="#home-collapse" aria-expanded="true">
              <i class="vps vps-alert-circle"></i>
              <span class="apbd-menu-title" v-translate>Home</span>
            </a>
            <div class="collapse" id="home-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" class="link-dark">
                    <i class="abi  abi-display"></i>
                    <span class="apbd-menu-title">Home 1</span>
                  </a>
                </li>
                <li><a href="#" class="link-dark">
                  <i class="abi  abi-display"></i>
                  <span class="apbd-menu-title">Home 2</span>
                </a></li>
                <li><a href="#" class="link-dark">
                  <i class="abi  abi-display"></i>
                  <span class="apbd-menu-title">Home 3</span>
                </a></li>
              </ul>
            </div>
          </li>
        </ul>
      </template>
      <template v-slot:menu-footer>
        <hr class="app-menu-divider">
        test
      </template>
      <template v-slot:app-content-header>
        <a href="/" class="d-flex align-items-center link-dark text-decoration-none">
                <span class="fs-4 apbd-menu-title">
                  {{ this.$translateGettext($route.meta.title)  }}
                </span>
        </a>

      </template>
      <template v-slot:app-body>
        <router-view/>
      </template>
    </AppContainer>
  </div>
</template>
<script>
import AppContainer from '@/components/AppContainer.vue'
export default {
  name: 'App',
  components: {
    AppContainer
  },
  data(){
    return {
      isMinMenu:false
    }
  },
  created() {

    this.$appsbdUtls.ShowNotification("Test notification");
    this.$appsbdUtls.ShowNotification("Test notification");
    this.$appsbdUtls.ShowNotification("Test notification");

  },


}
</script>
