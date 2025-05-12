<template>
  <module-loader class="p-3" msg="Loading Data" v-if="module_loading"/>
  <div class="ps-3 pe-3 pb-3" v-if="!module_loading">
    <div class="card m-3">
      <div class="card-body p-3">
          Welcome to vitepos Dashboard
      </div>
    </div>
    <div class="row mt-3 m-2 mb-0">
      <div class="col-lg-7">
        <div class="row">
          <div class="col-md mb-2">
            <div class="total_activity">
              <h6>Total Income</h6>
              <h5><span class="counter" v-html="dashboardStore.total_amount_text"></span> </h5>
            </div>
          </div>
          <div class="col-md mb-2">
            <div class="total_activity total-orders ">
              <h6>Total Orders</h6>
              <h5><span class="counter">{{ dashboardStore.total_orders }}</span> </h5>
            </div>
          </div>
          <div class="col-md mb-2">
            <div class="total_activity by-cash ">
              <h6>Total Outlets</h6>
              <h5><span class="counter">{{ dashboardStore.total_outlets }}</span> </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg">
            <table class="table table-striped">
              <thead class="table-primary">
              <tr>
                <th scope="col">Outlet Name</th>
                <th  class="text-center">Total Orders</th>
                <th  class="text-end">Total Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(outlet,index) in dashboardStore.outlets">
                <td  >{{outlet?.outlet_name}}</td>
                <td class="text-center">{{outlet?.total_order}} </td>
                <td  class="text-end">{{outlet?.total_amount}}</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="row">
          <div class="col-lg-6">
            <pie-chart :data="dashboardStore.outlets_pie_order"></pie-chart>
          </div>
          <div class="col-lg-6">
            <pie-chart :data="dashboardStore.outlets_pie_amount"></pie-chart>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-sm">
        <line-chart :data="{'2021-01-01': 11, '2021-01-02': 6}"></line-chart>

        <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart>
        <bar-chart :data="[['Work', 32], ['Play', 1492]]"></bar-chart>
        <area-chart :data="{'2021-01-01': 11, '2021-01-02': 6}"></area-chart>
        <scatter-chart :data="[[174.0, 80.0], [176.5, 82.3]]" xtitle="Size" ytitle="Population"></scatter-chart>
        <geo-chart :data="[['United States', 44], ['Germany', 23], ['Brazil', 22]]"></geo-chart>
        <timeline :data="[['Washington', '1789-04-29', '1797-03-03'], ['Adams', '1797-03-03', '1801-03-03']]"></timeline>

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
      ed_content: 'init content'
    }
  },
  computed: {
    ...mapStores(useDashboardStore)
  },
  async mounted() {
    try {
      await this.dashboardStore.loadData();
      this.module_loading = false;
    } catch (e) {
      this.$appsbdUtls.ShowNotification("Server Connection failed", false);
      this.module_loading = false;
    }
  }
}
</script>

<style scoped lang="scss">

  .vtpos-bg{
    background: var(--apbd-theme-color);
  }

</style>