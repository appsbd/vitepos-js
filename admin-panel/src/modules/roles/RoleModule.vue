<template>
  <div>
    <div class="card m-3">
      <div class="card-body p-3">
        <div class="d-flex justify-content-end">
          <ul class="nav apbd-tab-nav w-100">
            <li class="nav-item">
              <router-link to="/roles/roles" class="apbd-tab-btn btn"><i class="vps vps-users"></i> <translate>Role List</translate></router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="role-list-panel">
      <router-view></router-view>
    </div>
  </div>


</template>

<script>
import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import Modal from "@/components/Modal";
import ResponseMsg from "@/components/ResponseMsg";
import {mapStores} from "pinia";
import {useOutletStore} from "@/stores/outlet";
import RoleAddForm from "@/modules/roles/RoleAddForm";
import RoleList from "@/modules/roles/RoleList";

export default {
  name: "RoleModule",
  components: {
    RoleList,
    RoleAddForm,
    EliteGrid,
    Modal,
    ResponseMsg
  },
  data() {
    return {
      tab: 'L',
      isShowRoleModal: false,
      isDataLoader: false,
      add_props: {},
      currentProps: {},
      msg: '',
      roleList: {
        page: 1,
        total: 1,
        records: 2,
        limit: 20,
        rowdata: [
          {id: 1, name: 'Administrator', status: 'A'},
          {id: 2, name: 'Customer', status: 'jhasdkasd'}
        ]
      },
      data_column: [
        EliteColumnModel.getColumn({name: "name", title: "Name", width: '200px', is_sortable: true}),
        EliteColumnModel.getColumn({name: "status", title: "Status", width: '200px'}),
      ],
    }
  },
  computed: {
    ...mapStores(useOutletStore),
    changedFormData() {
      return Object.keys(this.add_props).reduce((formData, field) => {
        if (this.add_props[field] !== this.currentProps[field]) {
          formData[field] = this.add_props[field];
        }
        return formData;
      }, {});
    },
  },
  methods: {
    eliteGridLoadData(gparam) {

    },
    async loadGridData() {
      this.isDataLoader = true;

      try {
        /*let response = await this.outletStore.getData();
        if (response) {
          this.outletData.records = response.records;
          this.outletData.total = response.total;
          this.outletData.rowdata = response.rowdata;
        }*/
      } catch (e) {

      }
      this.isDataLoader = false;
    },
    async addRole() {
      if (this.add_props.id) {
        if (Object.keys(this.changedFormData).length === 0) {
          alert('No changes');
          return;
        } else {
          this.changedFormData['id'] = this.add_props.id;
          this.$refs.role_modal.showLoader(true, "Updating Role");
          let response = await this.outletStore.updateOutlet(this.changedFormData);
          this.$refs.role_modal.showLoader(false);
          if (response.status) {
            this.$refs.role_modal.clearForm();
            this.$refs.role_modal.showMsgOnly(response.msg.info);
            this.loadGridData();
          } else {
            this.msg = response.msg;
          }
        }
      } else {
        this.$refs.role_modal.showLoader(true, "Saving Role");
        let response = await this.outletStore.addOutlet(this.add_props);
        this.$refs.role_modal.showLoader(false);
        if (response.status) {
          this.$refs.role_modal.clearForm();
          this.$refs.role_modal.showMsgOnly(response.msg.info);
          this.loadGridData();
        } else {
          this.msg = response.msg;
        }
      }
    },
    closeModal() {
      this.isShowRoleModal = false
      this.$refs.role_modal.clearForm();
    },
    loaderStatusChange(param) {
      this.isShowRoleModal = param;
    },
  }
}
</script>

<style scoped>

</style>