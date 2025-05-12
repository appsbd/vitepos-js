<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-menu-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
          <i class="vps vps-vite-pos"></i>
          <span class="apbd-app-title">
            <i class="vps vps-vt-pos"></i>
          </span>
        </router-link>

      </template>
      <template v-slot:app-header-right>
        <a v-if="$appsbdUtls.POSLink()" target="_blank" :href="$appsbdUtls.POSLink()" class="btn btn-sm btn-theme-outline">
          <i class="vps vps-vite-pos"></i>
          <span v-translate>View POS</span>
        </a>
        <button @click="view_help=true" class="btn btn-sm btn-theme-outline">
          <i class="vps vps-help-circle"></i>
          <span v-translate>Help</span>
        </button>
      </template>
      <template v-slot:main-menu>
        <ul class="apbd-main-menu" @click="">
          <li>
            <router-link to="/" class="">
              <i class="vps vps-dashboard-a"></i>
              <span class="apbd-menu-title" v-translate>Dashboard</span>
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
        </ul>
      </template>
      <template v-slot:menu-footer>


      </template>
      <template v-slot:app-content-header>
        <a href="/" class="d-flex align-items-center link-dark text-decoration-none">
                <span class="fs-4 apbd-menu-title">
                  {{ this.$translateGettext($route.meta.title) }}
                </span>
        </a>

      </template>
      <template v-slot:app-body>
        <router-view/>
        <div class="user-locked-panel" v-if="showAlert">
          <AlertInfo @onclose="hideAlert" :msg="getMsg" />
        </div>
        <modal v-if="view_help" modal-size="modal-xl"  :hide-form="true" body-class="p-0" @close="view_help=false">
          <template v-slot:header>
            <i class="vps vps-help-circle me-1"></i> <translate>Help</translate>
          </template>
          <template v-slot:body>
            <help-module/>
          </template>
          <template v-slot:footer="{close}">
            <button type="button" class="btn btn-sm btn-secondary" @click="close" data-dismiss="modal"  v-translate>
              Close
            </button>
          </template>
        </modal>
      </template>

    </AppContainer>


  </div>
</template>
<script>
import AppContainer from '@/components/AppContainer.vue'
import Basic from "@/modules/help/basic";
import Modal from "@/components/Modal";
import HelpModule from "@/modules/help/HelpModule";
import AlertInfo from "@/components/AlertInfo";

export default {
  name: 'App',
  components: {
    AlertInfo,
    HelpModule,
    Modal,
    Basic,
    AppContainer
  },
  data() {
    return {
      view_help:false,
      showAlert:false,
      getMsg:'',
      isMinMenu: false
    }
  },
  mounted() {
    this.$eventBus.$on('show-alert',this.displayAlert);
  },
  methods:{
    hideAlert(){
      this.getMsg='';
      this.showAlert=false
    },
    displayAlert(msg)
    {
      this.getMsg=msg?msg:'';
      this.showAlert=true;
    }
  }
}
</script>
