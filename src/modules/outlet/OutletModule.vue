<template>
  <div>
    <div class="card m-3">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-sm-8">
            <apbd-filter-panel :is-single="true" @searchFilter="this.searchData" @reset="this.clearSearch" />
          </div>
          <div class="col-sm-4 text-end">
            <button class="btn btn-sm btn-theme" @click="showModal()" v-translate>Add Outlet</button>
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
            :grid-data="outletData"
            :is-show-row-index-column="true"
            @loadData="eliteGridLoadData"
        >
          <template v-slot:slotaddress="outletProps">
            {{outletProps.rowitem.street}},<br>
            {{outletProps.rowitem.city}},
            {{outletProps.rowitem.state}}, {{outletProps.rowitem.zip_code}} <br>
            {{outletProps.rowitem.country}}
            {{outletProps.rowitem.phone}} <br>
            {{outletProps.rowitem.email}} <br>
          </template>
          <template v-slot:slotmain_branch="outletProps">
            {{ $translateGettext(outletProps.rowitem.main_branch=='Y'?"Yes":"No") }}
            <a v-if="outletProps.rowitem.main_branch!='Y'" class="btn btn-grid-act btn-sm btn-theme" @click="changeMainBranch(outletProps.rowitem)">
              <i class="vps vps-shop "></i> <span v-translate>Make Main</span>
            </a>
          </template>
          <template v-slot:slotcounters="outletProps">
            <div class="card m-0">
              <ul class="list-group list-group-flush ">
                <li class="list-group-item d-flex justify-content-between align-items-center" :key="'counter-'+counter_index" v-for="(counter,counter_index) in outletProps.rowitem.counters">
                  <span class="me-2">{{counter_index+1}}. {{counter.name}}</span>
                  <div class="apbd-li-actions ">
                    <button class="btn btn-xs btn-theme"  @click="showCounterModal(outletProps.rowitem,counter.id,)"><i class="vps vps-edit-2"></i></button>
                    <button class="btn btn-xs btn-danger"  @click="deleteCounter(counter)"><i class="vps vps-trash-2"></i></button>
                  </div>
                   </li>
              </ul>

              <div class="card-footer text-center">
                <button class="btn btn-xs btn-primary me-2"  @click="showCounterModal(outletProps.rowitem)"><i class="fw-bolder aps aps-edit "></i> <translate>Add Counter</translate></button>
              </div>
            </div>
          </template>
          <template v-slot:slot-no-record >
            {{this.$translateGettext('No %{type} found',{type:'outlet'})}}
          </template>
          <template v-slot:slot-loader >
            <APBDGridLoader msg="Loading Outlet" />
          </template>
          <template v-slot:actionProperty="slotProps">
            <a class="btn btn-grid-act  btn-sm btn-theme me-2"  @click="showModal(slotProps.rowitem.id)">
              <i class="vps vps-edit "></i> <span v-translate>Edit</span>
             </a>
            <a class="btn btn-grid-act btn-sm btn-danger" @click="deleteOutlet(slotProps.rowitem)">
              <i class="vps vps-trash-2 "></i> <span v-translate>Delete</span></a>
            <button @click="showUserModal(slotProps.rowitem.id)" class="btn btn-grid-act  btn-sm btn-theme ms-2"><i class="vps vps-user "></i> <span v-translate>Users</span></button>
          </template>
        </elite-grid>
      </div>
    </div>

  </div>

  <modal v-show="isShowModal" :modal-msg="msg" modal-size="modal-md" ref="outlet_modal"  @onSubmit="createOutlet($event)" @loading-status="loaderStatusChange" @close="closeModal">
    <template v-slot:header>
      <span> {{ add_props.id?this.$gettext('Edit Outlet'):this.$gettext('Add Outlet')}}</span>

    </template>
    <template v-slot:body>
      <OutletAdd :form-props="add_props" />
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="closeModal" v-translate>Cancel</button>
      <button type="submit" class="btn btn-sm btn-theme" data-dismiss="modal">{{ add_props.id?this.$gettext('Update'):this.$gettext('Add')}}</button>
    </template>
  </modal>

  <modal v-show="isShowCounterModal"  :modal-msg="msg" modal-size="modal-md" ref="counter_modal"  @onSubmit="createCounter($event)" @loading-status="loaderStatusChange" @close="closeCounterModal">
    <template v-slot:header>
      <span> {{ add_props.id?this.$gettext('Edit Counter'):this.$gettext('Add Counter')}}</span>

    </template>
    <template v-slot:body>
      <div class="card mb-3">
        <div class="card-header card-header-sm text-center" v-translate>
          Outlet Details
        </div>
        <div class="card-body p-0">
          <table class="table table-sm table-theme mb-0">
            <tbody>
            <tr>
              <th scope="row" v-translate>Outlet Name</th>
              <td><strong>{{selectedOutlet.name?selectedOutlet.name:''}}{{selectedOutlet.contact_no?'('+selectedOutlet.contact_no+')':''}}</strong></td>
            </tr>
            <tr>
              <th scope="row" v-translate>Address</th>
              <td>{{selectedOutlet.address}}<br>{{selectedOutlet.country}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <CounterAdd :form-props="add_props" />
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="closeCounterModal" v-translate>Cancel</button>
      <button type="submit" class="btn btn-sm btn-theme" data-dismiss="modal">{{ add_props.id?this.$gettext('Update'):this.$gettext('Add')}}</button>
    </template>
  </modal>
  <modal v-show="isShowUserModal" modal-size="modal-lg" ref="user_modal"  @onSubmit="createCounter($event)" @loading-status="loaderStatusChange" @close="closeUserModal">
    <template v-slot:header>
      <span> {{ this.$gettext('Outlet User List')}}</span>
    </template>
    <template v-slot:body>
      <div class="card mb-3 " :class="isSending?'apbd-loading-parent':''">
        <div class="card-header card-header-sm d-flex justify-content-center align-items-center ">
          <div class="w-75">
            <multiselect  v-model="add_props.user_id"  label="name" valueProp="id"
                          placeholder="Select/Search user to add" :searchable="true" :options="getMultiUser">
              <template v-slot:singlelabel="{ value }">
                <div class=" custom-dd">
                  <div class="w-100 d-flex justify-content-between align-items-center">
                    <span class="dd-title">{{value.name}}</span>
                    <span class="dd-icon"> <span v-for="role in value.role">{{role.name}} </span></span>
                  </div>
                </div>
              </template>

              <template v-slot:option="{ option }">
                <div class="d-flex w-100 justify-content-between align-items-center">
                  <span class="dd-title">{{option.name}}</span>
                  <span class="dd-icon"> <span v-for="role in option.role">{{role.name}} </span></span>
                </div>
              </template>
            </multiselect>
          </div>
          <div class="ms-2">
            <button :disabled="this.add_props?.user_id==null" type="button" @click="addOutletToUser" class="btn btn-sm btn-theme apbd-loading-btn">
              <i class="vps vps-user-add me-2"></i> <translate class="apbd-loading-hide">Add to this outlet </translate>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="m-3">
            <ResponseMsg v-if="showResponse" :message="msg" @removeInfo="removeMsg"/>
          </div>
          <div class="m-3 ">
            <div class="elite-grid-container">
              <elite-grid
                  :is-rounded="true"
                  :is-group-separate-head="true"
                  action-width="200px"
                  :columns="user_data_column"
                  :show-loader="isUserDataLoader"
                  :show-header="false"
                  :show-action-column="true"
                  :grid-data="users"
                  :is-show-row-index-column="true"
                  @loadData="loadUserData"
              >
                <template v-slot:slotname="slotProps">
                  {{ slotProps.rowitem.first_name?slotProps.rowitem.first_name+' '+slotProps.rowitem.last_name:slotProps.rowitem.username }}
                </template>
                <template v-slot:slotrole="roleslotProps">
                  <span v-if="roleslotProps.rowitem.role.length>0" v-for="role in roleslotProps.rowitem.role">{{role.name}} </span>
                  <span v-else>-</span>
                </template>
                <template v-slot:slot-loader >
                  <APBDGridLoader msg="Loading users" />
                </template>
                <template v-slot:actionProperty="slotProps">
                  <VDropdown>
                    <button type="button" class="btn btn-grid-act btn-sm btn-danger" >
                      <i class="vps vps-trash-2 "></i> <span v-translate>Remove</span>
                    </button>
                  <template #popper>
                    <div class="remove-user-pnl" :class="isRemoving?'apbd-loading-parent':''">
                      <div v-translate>Are you sure to remove this user from this outlet ?</div>
                      <div class="d-flex justify-content-center align-items-center">
                        <button ref="remove" class="btn btn-sm btn-danger apbd-loading-btn" @click="removeFromOutlet(slotProps.rowitem.id)"><translate class="apbd-loading-hide">Yes</translate></button>
                        <button v-close-popper.all class="ms-2 btn btn-sm btn-success apbd-loading-hide" v-translate>No</button>
                      </div>
                    </div>
                  </template>
                  </VDropdown>
                </template>
              </elite-grid>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="closeUserModal" v-translate>Cancel</button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";
import OutletAdd from "@/modules/outlet/OutletAdd";
import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import { mapStores } from 'pinia'
import {useOutletStore} from "@/stores/outlet";
import APBDGridLoader from "@/components/APBDGridLoader";
import CounterAdd from "@/modules/outlet/CounterAdd";
import ResponseMsg from "@/components/ResponseMsg";
import ApbdFilterPanel from "@/components/ApbdFilterPanel";
import APBDRequestParam from "@/libraries/APBDRequestParam";
import Multiselect from '@vueform/multiselect';
import { hideAllPoppers } from 'floating-vue'
export default {
  name: "OutletModule",
  components: {
    ApbdFilterPanel,
    ResponseMsg,
    CounterAdd,
    APBDGridLoader,
    OutletAdd,
    Modal,
    Multiselect,
    EliteGrid
  },
  data() {
    return {
      module_id: "POS_Warehouse",
      isShowModal: false,
      isShowUserModal: false,
      isShowCounterModal:false,
      isShowLoader: false,
      showResponse: false,
      isSending: false,
      isRemoving: false,
      isDataLoader: false,
      isUserDataLoader: false,
      outlet_id: null,
      msg:{},
      selectedOutlet:{
        id: '',
        name:'',
        contact_no:'',
        address:'',
        country:''
      },
      outletData: {
        page: 1,
        total: 1,
        records: 0,
        limit: 20,
        rowdata: []
      },
      users: {
        page: 1,
        total: 1,
        records: 0,
        limit: 20,
        rowdata: []
      },
      demo:[{name:'bijon',id:1}],
      allUsers: [],
      searchProps:[],
      sortProps:null,
      add_props: {},
      currentProps: {},
      data_column: [
        EliteColumnModel.getColumn({name: "name",  title: "Name", width: '200px', is_sortable: true}),
        EliteColumnModel.getColumn({name: "address", title: "Address", width: '200px'}),
        EliteColumnModel.getColumn({name: "main_branch", title: "Main Branch", title_align:"center", align:"center", width: '200px'}),
        EliteColumnModel.getColumn({name: "counters", title: "Counters",title_align:"center", width: '200px'}),
      ],
      user_data_column: [
        EliteColumnModel.getColumn({name: "name",  title: "Name", width: '200px', is_sortable: true}),
        EliteColumnModel.getColumn({name: "role", title: "Roles", width: '200px'}),
      ],
    }
  },
  mounted() {
      this.loadGridData();
      this.getAllUsers();
  },
  computed: {
    ...mapStores(useOutletStore),
    getMultiUser()
    {
      let user = [];
      try {
        user = this.allUsers.filter(item => !item.outlet_id.includes(this.outlet_id));
        for (let i=0 ; i<user.length;i++)
        {
          user[i].name=user[i].first_name?user[i].first_name+' '+user[i].last_name:user[i].username;
        }
        return user;
      }catch (e) {
        return user;
      }
    }
  },
  methods: {
    removeMsg(){
      this.msg={};
      this.showResponse=false;
    },
    async removeFromOutlet(user_id){
      this.isRemoving=true;
      if (user_id)
      {
        let response = await this.outletStore.removeUserFromOutlet({user_id:user_id,outlet_id:this.outlet_id});
        this.msg=response.data.msg
        this.showResponse=true;
        if (response.data.status)
        {
          hideAllPoppers();
          this.isRemoving=false;
          this.getAllUsers();
          this.showUserModal(this.outlet_id);
        }
      }

    },
    async addOutletToUser(){
      this.isSending=true;
      if (this.add_props?.user_id)
      {
        let response = await this.outletStore.addUsertoOutlet({user_id:this.add_props?.user_id,outlet_id:this.outlet_id});
        this.msg=response.data.msg
        if (response.data.status)
        {
          this.add_props={};
          this.getAllUsers();
          this.showUserModal(this.outlet_id);
        }
        this.showResponse=true;
        this.isSending=false;
      }
    },
    async showUserModal(outletId) {
      this.outlet_id = outletId;
      if (this.outlet_id != null) {
        this.isShowUserModal = true;
        this.$refs.user_modal.showLoader(true, "Getting user list");
        const param = new APBDRequestParam();
        param.limit = this.users.limit;
        param.page = this.users.page;
        param.AddSrcItem('outlet_id', outletId, 'eq');
        let response = await this.outletStore.getUserList({...param});
        this.$refs.user_modal.showLoader(false);
        this.users = {...response.data};
      }
    },
    searchData(data)
    {
     this.searchProps=data;
      this.outletData.page = 1;
      this.loadGridData();
    },
    clearSearch(){
     this.searchProps=[];
      this.loadGridData();
    },
    deleteCounter(counter) {
      var thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(this.$translateGettext('Are you sure to delete this counter: %{counter}?',{counter:counter.name}),  async function () {
        let response = await thisObj.outletStore.deleteCounter(counter.id);
        if (response.status)
        {
          thisObj.loadGridData();
        }
        return response;
      });
    },
   async changeMainBranch(outlet) {
      if (outlet.main_branch=='Y')
      {
        outlet.main_branch='N';
      }else {
        outlet.main_branch='Y';
      }
      var thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(this.$gettext("Are you sure to make this main branch?"), async function () {
        let response = await thisObj.outletStore.changeMainBranch({id:outlet.id,main_branch:outlet.main_branch});
        if (response.status)
        {
          thisObj.loadGridData();
        }
        return response;
      },{confirmButtonText:this.$translateGettext('Yes'),cancelButtonText:this.$translateGettext('No')},function (result) {
        if (!result.isConfirmed)
        {
          if (outlet.main_branch=='Y')
          {
            outlet.main_branch='N';
          }else {
            outlet.main_branch='Y';
          }
        }
      });
    },
   deleteOutlet(outlet)
    {
      var thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(this.$translateGettext('Are you sure to delete this outlet: %{outlet}?',{outlet:outlet.name}), async function () {
        let response= await thisObj.outletStore.deleteOutlet(outlet.id);
        if (response.status)
        {

          thisObj.loadGridData();
        }
        return response;

      });
    },
    changeStatus()
    {
      if (this.add_props.status=='A')
      {
        this.add_props.status='I'
      }else {
        this.add_props.status='A'
      }
    },
    getCounterField(counters){
      let counterStr='';
      try {
        if (counters) {
          for (let i in counters) {
            counterStr += counters[i].name + "<br>";
          }
        }
      }catch (e) {

      }
      return counterStr
    },
    closeModal() {
      this.isShowModal = false
      this.clearForm();
    },
    clearForm(){
      this.add_props={};
      this.currentProps={};
      this.$refs.outlet_modal.clearForm();
      this.$refs.counter_modal.clearForm();
    },
    closeCounterModal() {
      this.isShowCounterModal = false
      this.add_props={};
      this.$refs.counter_modal.clearForm();
    },
    closeUserModal() {
      this.msg={};
      this.add_props={};
      this.isShowUserModal = false
    },
     eliteGridLoadData(gparam) {
       this.outletData.limit = gparam.limit;
       this.outletData.page = gparam.page;
       if(gparam.sort_prop){
         this.sortProps={
           prop:gparam.sort_prop,
           ord:gparam.sort_ord
         }
       }else{
         this.sortProps=null;
       }
       this.loadGridData();

     },
    getSearchParam(){
      const param = new APBDRequestParam();
      param.limit=this.outletData.limit;
      param.page=this.outletData.page;

      if(this.searchProps.length>0){
        for (let i=0;i<this.searchProps.length;i++)
        {
          param.AddSrcItem(this.searchProps[i].propName,this.searchProps[i].value,this.searchProps[i].operators);
        }
      }
      if(this.sortProps){
        param.AddSortItem(this.sortProps.prop,this.sortProps.ord);
      }
      return param;
    },
    async loadGridData(){
      this.isDataLoader=true;
      try {
        const param=this.getSearchParam();
        let response = await this.outletStore.getData(param);
        if (response) {
          this.outletData.records = response.records;
          this.outletData.total = response.total;
          this.outletData.rowdata = response.rowdata;
        }
      }catch (e) {
        console.log(e.message);
      }
      this.isDataLoader=false;
    },
    async loadUserData(gparam){
      this.isUserDataLoader=true;
      try {
        const param = new APBDRequestParam();
        param.limit=gparam.limit?gparam.limit:this.users.limit;
        param.page=gparam.page?gparam.page:this.users.page;
        param.AddSrcItem('outlet_id',this.outlet_id,'eq');
        if (gparam.sort_by)
        {
          param.AddSortItem(gparam.sort_by.prop,gparam.sort_by.ord)
        }
        let response = await this.outletStore.getUserList({...param});
        if (response) {
          this.users.records = response.data.records;
          this.users.total = response.data.total;
          this.users.rowdata = response.data.rowdata;
        }
      }catch (e) {
        console.log(e.message);
      }
      this.isUserDataLoader=false;
    },
    async getAllUsers(){
      try {
        const param = new APBDRequestParam();
        param.limit=-1;
        param.page=1;
        let response = await this.outletStore.getUserList({...param});
          this.allUsers = response.data.rowdata;
      }catch (e) {
        console.log(e.message);
      }
      this.isUserDataLoader=false;
    },
    async createOutlet() {
      if (this.add_props.id) {
        let changedFormData = this.$appsbdUtls.changedFormData(this.add_props,this.currentProps);
        if (Object.keys(changedFormData).length === 0) {
          let resp= {error:['No changer found for update']};
          this.msg=resp;
          return;
        }else {
          changedFormData['id']=this.add_props.id;
          this.$refs.outlet_modal.showLoader(true, "Updating Counter Details");
          let response = await this.outletStore.updateOutlet(changedFormData);
          this.$refs.outlet_modal.showLoader(false);
          this.msg=response.msg;
          if (response.status)
          {
            this.clearForm();
            this.add_props.id=changedFormData['id'];
            this.$refs.outlet_modal.setMessageOnly(true);
            this.loadGridData();
          }
        }

      } else {
        this.$refs.outlet_modal.showLoader(true, "Saving Counter Details");
        let response = await this.outletStore.addOutlet(this.add_props);
        this.$refs.outlet_modal.showLoader(false);
        this.msg=response.msg;
        if (response.status)
        {
          this.clearForm();
          this.$refs.outlet_modal.setMessageOnly(true);
          this.loadGridData();
        }else {
          this.msg=response.msg;
        }
      }
    },

    async createCounter() {
      this.add_props.outlet_id=this.selectedOutlet.id;
      let changedFormData = this.$appsbdUtls.changedFormData(this.add_props,this.currentProps);
      if (this.add_props.id) {
        if (Object.keys(changedFormData).length === 0) {
          let resp= {error:['No changer found for update']};
          this.msg=resp;
          return;
        }else {
          this.$refs.counter_modal.showLoader(true, "Updating Counter Details");
          let response = await this.outletStore.updateCounter(this.add_props);
          this.msg= response.msg
          this.$refs.counter_modal.showLoader(false);
          if (response.status)
          {
            this.$refs.counter_modal.clearForm();
            this.$refs.counter_modal.setMessageOnly(true);
            this.loadGridData();
          }else {
            this.msg=response.msg;
          }
        }

      } else {
        this.$refs.counter_modal.showLoader(true, "Saving Counter Details");
        let response = await this.outletStore.addCounter(this.add_props);
        this.msg= response.msg
        this.$refs.counter_modal.showLoader(false);
        if (response.status)
        {
          this.add_props={};
          this.$refs.counter_modal.clearForm();
          this.$refs.counter_modal.setMessageOnly(true);
          this.loadGridData();
        }else {
          this.msg=response.msg;
        }
      }


    },
   async showModal(id) {
      this.$refs.outlet_modal.clearForm();
      this.msg={};
      this.add_props={};
      if (id) {
        this.isShowModal = true;
        this.$refs.outlet_modal.showLoader(true, "Loading Outlet Details");
        let response = await this.outletStore.getOutletDetails({id:id});
        this.$refs.outlet_modal.showLoader(false);
        if (response.status){
          this.add_props={...response.data};
          this.currentProps={...response.data};
          if (this.add_props.status=='A')
          {
            this.add_props.status=true;
            this.currentProps.status=true;
          }else {
            this.currentProps.status=false;
            this.add_props.status=false;
          }

        }

      } else {
        if (this.outletData.rowdata.length>=1)
        {
          this.$eventBus.$emit('show-alert','For multiple outlet you need to active pro version.');
          return;
        }
        this.isShowModal = true;
      }
    },
   async showCounterModal(outlet,id) {
     this.msg={};
     await this.$refs.counter_modal.clearForm();
      this.selectedOutlet.id=outlet.id;
      this.selectedOutlet.name=outlet.name;
      this.selectedOutlet.contact_no=outlet.phone;
      this.selectedOutlet.address=outlet.street?outlet.street+','+outlet.city+','+outlet.state+'.':''+outlet.city+','+outlet.state+'.';
      this.selectedOutlet.country=outlet.country;

      if (id) {
        this.add_props={};
        this.add_props.id=id
        this.add_props.outlet_id=outlet.id
        this.isShowCounterModal = true;
        this.$refs.counter_modal.showLoader(true, "Loading Outlet Details");
        let response = await this.outletStore.getCounterDetails(this.add_props);
        if (response.status){
          this.add_props={...response.data};
          this.currentProps={...response.data};
        }
        this.$refs.counter_modal.showLoader(false);
      } else {
        if (this.outletData.rowdata[0].counters.length>=2)
        {
          this.$eventBus.$emit('show-alert',this.$translateGettext('For add more than two counter it requires pro version.'));
          return;
        }
        this.isShowCounterModal = true;
      }
    },
    loaderStatusChange(param) {
      this.isShowLoader = param;
    },
  }
}
</script>

<style scoped lang="scss">
.custom-dd{
  width: 100%;
  margin: 0 10px;
  z-index: 9;
}
.remove-user-pnl{
  width: 200px;
  text-align: center;
  padding: 5px;
  >div{
   margin:10px;
  }
  button{
    margin-bottom: 5px;
  }
}
</style>