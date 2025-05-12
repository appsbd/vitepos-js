<template>

  <div class="ps-3 pe-3 pb-3" >
    <div class="card m-3">
      <div class="card-body p-3">
        <p class="mb-0">
          <translate>Welcome to</translate> <i class="vps vps-vt-pos"></i> Lite.
          <br><translate>Empowering Your WooCommerce Store with Vitepos</translate>
        </p>
      </div>
    </div>
    <module-loader class="p-3" msg="Loading Data" v-if="module_loading"/>
    <div v-if="!module_loading" class="row mt-3 m-2 mb-0">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-md mb-2">
            <div class="total_activity">
              <h6 v-translate>Total Income</h6>
              <h5><span class="counter" v-html="dashboardStore.total_amount_text"></span> </h5>
            </div>
          </div>
          <div class="col-md mb-2">
            <div class="total_activity total-orders ">
              <h6 v-translate>Total Orders</h6>
              <h5><span class="counter">{{ dashboardStore.total_orders }}</span> </h5>
            </div>
          </div>
          <div class="col-md mb-2">
            <div class="total_activity by-cash ">
              <h6 v-translate>Total Outlets</h6>
              <h5><span class="counter">{{ dashboardStore.total_outlets }}</span> </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg">
            <table class="table table-striped">
              <thead class="table-primary">
              <tr>
                <th scope="col" v-translate>Outlet Name</th>
                <th  class="text-center" v-translate>Total Orders</th>
                <th  class="text-end" v-translate>Total Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(outlet,index) in dashboardStore.outlets">
                <td  >{{outlet?.outlet_name}}</td>
                <td class="text-center">{{outlet?.total_order}} </td>
                <td  class="text-end" v-html="outlet?.total_amount_text"></td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4 text-center">
          <pie-chart :data="dashboardStore.outlets_pie_order"></pie-chart>
          <small ><i><translate>Based on outlet order(s)</translate></i></small>
      </div>
    </div>
  </div>

</template>

<script>
import ModuleLoader from "@/components/ModuleLoader";
import {mapStores} from 'pinia'
import {useDashboardStore} from "@/stores/dashboard";
export default {
  name: "dashboard",
  components: {ModuleLoader},
  data() {
    return {
      module_loading: true,
      ed_config: {language: "en_US"},
      ed_content: 'init content',
      sync_interval:null,
    }
  },
  computed: {
    ...mapStores(useDashboardStore)
  },
  async mounted() {

    try {
      await this.dashboardStore.loadData(true);
      this.module_loading = false;
    } catch (e) {
      this.$appsbdUtls.ShowNotification("Server Connection failed", false);
      this.module_loading = false;
    }
    try {
      clearInterval(this.sync_interval);
    }catch(e){}
    this.sync_interval=setInterval(this.sync_data,30000);
  },
  unmounted() {
    try {
      clearInterval(this.sync_interval);
    }catch(e){}
  },
  methods:{
    async sync_data(){
      await this.dashboardStore.loadData(true);
    }
  }

}
</script>

<style scoped lang="scss">

  .vtpos-bg{
    background: var(--apbd-theme-color);
  }
  .vps {
    &.vps-vt-pos {
      vertical-align: middle;
    }
  }

</style>