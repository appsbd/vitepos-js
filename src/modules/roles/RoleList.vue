<template>
  <div>
    <div class="card m-3">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-sm-8">
            <apbd-filter-panel :is-single="true" @searchFilter="this.searchData" @reset="this.clearSearch" />
          </div>
          <div class="col-sm-4 text-end">
          <button class="btn btn-sm btn-theme" @click="showModal()" v-translate>Add Role</button>
          </div>
        </div>
      </div>
    </div>
    <div class="m-3 ">
      <div class="elite-grid-container">
        <elite-grid
            :is-rounded="true"
            :is-group-separate-head="true"
            action-width="200px"
            :columns="data_column"
            :show-loader="isDataLoader"
            :show-header="false"
            :show-action-column="true"
            :grid-data="gridData"
            :is-show-row-index-column="true"
            @loadData="eliteGridLoadData"
        >
          <template v-slot:slotname="slotProps">
            {{ slotProps.rowitem.name }}
            <span class="text-success" v-if="slotProps.rowitem.is_editable=='N'">
            ({{ this.$translateGettext("Built-in") }})
          </span>
          </template>
          <template v-slot:slotmax_discount="slotProps">
            {{ slotProps.rowitem.max_discount}} {{ slotProps.rowitem.discount_type =='P'?'%':'$'}}
          </template>
          <template v-slot:slot-loader >
            <APBDGridLoader msg="Loading Roles" />
          </template>
          <template v-slot:actionProperty="slotProps">
            <div v-if="slotProps.rowitem.is_editable=='Y'">
              <a class="btn btn-grid-act btn-sm btn-theme me-2" @click="showModal(slotProps.rowitem.id)">
                <i class="vps vps-edit "></i> <span v-translate>Edit</span>
              </a>
              <a class="btn btn-grid-act btn-sm btn-danger" @click="deleteRoleModal(slotProps.rowitem)">
                <i class="vps vps-trash-2 "></i> <span v-translate>Delete</span>
              </a>
            </div>
            <div v-else>-</div>
          </template>
        </elite-grid>
      </div>
    </div>
  </div>
  <modal v-show="isShowModal" :modal-msg="msg" modal-size="modal-md" ref="role_modal" @onSubmit="addRole($event)"
         @loading-status="loaderStatusChange" @close="closeModal">
    <template v-slot:header>
      <span> {{ add_props.id ? this.$gettext('Edit Role') : this.$gettext('Add Role') }}</span>

    </template>
    <template v-slot:body>
       <role-add-form :form-props="add_props" />
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="closeModal" v-translate>
        Cancel
      </button>
      <button type="submit" class="btn btn-sm btn-theme" data-dismiss="modal">
        {{ add_props.id ? this.$gettext('Update') : this.$gettext('Add') }}
      </button>
    </template>
  </modal>
  <modal v-show="isShowDeleteModal" :modal-msg="msg" modal-size="modal-md" ref="delete_role_modal" @onSubmit="deleteRole($event)"
          @close="closeDeleteModal">
    <template v-slot:header>
      <span> {{ this.$gettext('Delete Role') }}</span>
    </template>
    <template v-slot:body>
      <role-delete-form ref="role-delete-form" :form-props="delete_props"  />
      <div class="form-row">
        <label >
          <div class="form-check form-switch form-switch-sm mt-0">
            <input v-model="delete_agree" class="form-check-input"  type="checkbox" id="status" name="status">
          </div>
          <span >
            <span class="b-agree-ctrn" v-html="getAgreedRole"></span>
          </span>
        </label>
      </div>
    </template>
    <template v-slot:footer="{close}">
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="close" v-translate>
        Cancel
      </button>
      <button :disabled="!delete_agree" type="submit" class="btn btn-sm btn-theme" data-dismiss="modal">
        {{ this.$gettext('Delete') }}
      </button>
    </template>
  </modal>

</template>

<script>
import Modal from "@/components/Modal";

import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import {mapStores} from 'pinia'
import {useRoleStore} from "@/stores/role";
import APBDGridLoader from "@/components/APBDGridLoader";
import ResponseMsg from "@/components/ResponseMsg";
import RoleAddForm from "@/modules/roles/RoleAddForm";
import RoleDeleteForm from "@/modules/roles/RoleDeleteForm";
import APBDRequestParam from "@/libraries/APBDRequestParam";
import ApbdFilterPanel from "@/components/ApbdFilterPanel";

export default {
  name: "RoleList",
  components: {
    ApbdFilterPanel,
    RoleDeleteForm,
    RoleAddForm,
    ResponseMsg,
    APBDGridLoader,
    Modal,
    EliteGrid
  },
  data() {
    return {
      module_id: "POS_Role",
      isShowModal: false,
      isShowDeleteModal: false,
      isShowCounterModal: false,
      isShowLoader: false,
      isDataLoader: false,
      msg: {},
      selectedOutlet: {
        id: '',
        name: '',
        contact_no: '',
        address: '',
        country: ''
      },
      gridData: {
        page: 1,
        total: 1,
        records: 0,
        limit: 20,
        rowdata: []
      },
      add_props: {},
      delete_props: {},
      delete_role_item:{},
      delete_agree:false,
      currentProps: {},
      searchProps:[],
      sortProps:null,
      data_column: [
        EliteColumnModel.getColumn({name: "name", title: "Name", width: '200px', is_sortable: true}),
        EliteColumnModel.getColumn({name: "max_discount", title: "Max Discount", width: '200px', is_sortable: false,align:'center',title_align:'center'}),

      ],
    }
  },
  mounted() {
    if (!this.roleStore.firstLoaded || !(this.roleStore.gridData && this.roleStore.gridData.records)) {
      this.loadGridData();
    } else {
      try {
        if (this.roleStore.gridData.records) {
          this.gridData.records = this.roleStore.gridData.records;
          this.gridData.total = this.roleStore.gridData.total;
          this.gridData.rowdata = this.roleStore.gridData.rowdata;
        } else {
          this.loadGridData();
        }
      } catch (e) {
        this.loadGridData();
      }
    }
  },
  computed: {
    getAgreedRole(){
      if(this.delete_role_item?.name) {
        return this.$translate.$gettext('I agree to delete the %{rolename} and move all users of %{rolename} to the selected role').replaceAll('%{rolename}','<b class="text-success">'+this.delete_role_item?.name+'</b>');
      }else{
        return 'I agree to delete the ----- and move all users of --- to the selected role';
      }
    },
    ...mapStores(useRoleStore)
  },
  methods: {
    searchData(data)
    {
      this.searchProps=data;
      this.gridData.page = 1;
      this.loadGridData();
    },
    clearSearch(){
      this.searchProps=[];
      this.loadGridData();
    },

    clearForm(){
      this.add_props={};
      this.currentProps={};
      this.$refs.role_modal.clearForm();
    },
    deleteRole_old(item) {
      var thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(this.$translateGettext('Are you sure to delete this outlet: %{role}?', {role: item.name}), async function () {
        let response = await thisObj.roleStore.deleteRole(item.id);
        if (response.status) {
          thisObj.loadGridData();
        }
        return response;

      });
    },
    async changeMainBranch(role) {
      var thisObj = this;
      let text="";
      if(role.status=='A'){
        text= this.$translateGettext('If you inactive then all user of this role will be subscriber');
      }
      this.$appsbdUtls.ShowConfirmRequest(this.$translateGettext('Are you sure to %{status}?',{status:role.status=='A'?'Inactive':'Active'}), async function () {
        let response = await thisObj.roleStore.changeRoleStatus({id:role.id});
        if (response.status)
        {
          role.status=response.data;
        }
        return response;
      },{confirmButtonText:this.$translateGettext('Yes'),cancelButtonText:this.$translateGettext('No'),title:text});
    },
    changeStatus() {
      if (this.add_props.status == 'A') {
        this.add_props.status = 'I'
      } else {
        this.add_props.status = 'A'
      }
    },
    closeModal() {
      this.isShowModal = false;
      this.msg = {};
      this.clearForm();
      this.delete_role_item={};
    },
    closeDeleteModal() {
      this.isShowDeleteModal = false;
      this.msg = {};
      this.$refs.delete_role_modal.clearForm();
      this.clearForm();
    },
    eliteGridLoadData(gparam) {
      this.gridData.limit = gparam.limit;
      this.gridData.page = gparam.page;
      if (gparam.sort_prop) {
        this.sortProps={prop:gparam.sort_prop,ord:gparam.sort_ord};
      }else{
        this.sortProps=null;
      }
      this.loadGridData();
    },
    async loadGridData() {
      this.isDataLoader = true;
      try {
        const param = new APBDRequestParam();
        param.limit=this.gridData.limit;
        param.page=this.gridData.page;

        if(this.searchProps.length>0){
          for (let i=0;i<this.searchProps.length;i++)
          {
            param.AddSrcItem(this.searchProps[i].propName,this.searchProps[i].value,this.searchProps[i].operators);
          }
        }
        if(this.sortProps){
          param.AddSortItem(this.sortProps.prop,this.sortProps.ord);
        }
       // param.AddSrcItem("id",{start:1,end:2},'bt');
       // param.AddSrcItem("*",'cash','like');
        //param.AddSortItem("name",'asc');
        let response = await this.roleStore.getData(param);
        if (response) {
          this.gridData.page = response.page;
          this.gridData.records = response.records;
          this.gridData.total = response.total;
          this.gridData.rowdata = response.rowdata;
        }
      } catch (e) {

      }
      this.isDataLoader = false;
    },

    async deleteRole({resetForm}) {
      this.msg = {};
      this.$refs.delete_role_modal.showLoader(true, this.$gettext('Delete Role'));
      let response = await this.roleStore.deleteRole(this.delete_props);
      this.$refs.delete_role_modal.showLoader(false, this.$gettext('Delete Role'));
      this.msg = response.msg;
      if (response.status) {
        this.$refs.delete_role_modal.setMessageOnly(true);
        await this.roleStore.setFirstLoad(false);
        this.loadGridData();
      }
    },
    async addRole({resetForm}) {
      this.msg={};
      if (this.add_props.id) {
        let changedFormData = this.$appsbdUtls.changedFormData(this.add_props,this.currentProps);
        if (Object.keys(changedFormData).length === 0) {
          let resp= {error:['No changer found for update']};
          this.msg=resp;
          return;
        } else {
          changedFormData['id']=this.add_props.id;
          this.$refs.role_modal.showLoader(true, this.$gettext('Updating Role Details'));
          let response = await this.roleStore.updateRole(changedFormData);
          this.$refs.role_modal.showLoader(false);
          this.msg = response.msg;
          if (response.status) {
            await this.roleStore.setFirstLoad(false);
            this.$refs.role_modal.setMessageOnly(true);
            this.loadGridData();
          }
        }
      } else {
        this.$refs.role_modal.showLoader(true, this.$gettext('Adding Role'));
        let response = await this.roleStore.addRole(this.add_props);
        this.$refs.role_modal.showLoader(false);
        this.msg = response.msg;
        if (response.status) {
          this.clearForm();
          this.$refs.role_modal.setMessageOnly(true);
          await this.roleStore.setFirstLoad(false);
          this.loadGridData();
        }
      }
    },
    async deleteRoleModal(role) {
      this.msg = {};
      this.$refs['role-delete-form'].SetRole(role);
      this.delete_role_item=role;
      this.delete_agree=false;
      this.isShowDeleteModal = true;


    },
    async showModal(id) {
      this.msg = {};
      if (id) {
        this.isShowModal = true;
        this.$refs.role_modal.showLoader(true, this.$gettext('Loading Outlet Details'));
        let response = await this.roleStore.getRoleDetails({id: id});
        this.$refs.role_modal.showLoader(false);
        this.msg = response.msg;
        if (response.status) {
          this.add_props = {...this.add_props,...response.data};
          this.currentProps = {...response.data};
          if (this.add_props.status == 'A') {
            this.add_props.status = true;
            this.currentProps.status = true;
          } else {
            this.currentProps.status = false;
            this.add_props.status = false;
          }
        }
      } else {
        this.isShowModal = true;
      }
    },

    loaderStatusChange(param) {
      this.isShowLoader = param;
    },
    loaderDeleteModalStatusChange(param) {
      this.isShowDeleteModal = param;
    },
  }
}
</script>

<style scoped lang="scss">

</style>
