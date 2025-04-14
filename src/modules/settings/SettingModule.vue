<template>
  <div class="card m-3">
    <div class="card-body p-3">
      <div class="d-flex justify-content-end">
        <ul class="nav apbd-tab-nav w-100">
          <li class="nav-item">
            <router-link to="/setting/basic-settings" class="apbd-tab-btn" >
              <i class="vps vps-settings"></i> <translate>Basic Settings</translate>
            </router-link>
          </li>
         </ul>
      </div>
    </div>
  </div>
  <div class="role-list-panel">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapStores} from 'pinia'
import {useSettingsStore} from "@/stores/settings";
export default {
  name: "SettingModule",
  data(){
    return {
      is_ref:false
    }
  },
  computed: {
    ...mapStores(useSettingsStore),
  },
  methods: {
    async refresh_app() {
      this.is_ref=true;
      let response = await this.settingsStore.refreshApp();
      console.log(response);
      if (response?.msg) {
        this.$appsbdUtls.ShowServerResponseNotification(response.msg, 5000);
      }
      this.is_ref=false;
    }
  }
}
</script>

<style lang="scss">

</style>
