<template>
  <div class="card choose-outlet-panel border-0 shadow rounded-3 my-5">
    <div class="card-body">
      <div class="float-end outlet-logout" >
        <i @click="makelogout" v-tooltip="this.$gettext('Logout')" class="vps vps-power-off" :class="onLogout?'infinite animated ape-flash slower':''"></i>
      </div>
      <div class="d-flex flex-column align-items-center">
        <div class="profile-img">
          <img v-if="this.$store.state?.loggedUserData?.img" :src="this.$store.state?.loggedUserData?.img" :alt="this.$store.state?.loggedUserData?.name">
        </div>
        <h5 class="card-title text-center mt-2 mb-3 fs-5"> <translate>Hello,</translate> {{user.name?user.name:user.username}}</h5>
      </div>
      <div v-if="showErrorMsg" class="alert alert-danger align-items-center justify-content-between" :class="showErrorMsg?'d-flex':''">
        <div class="d-flex align-items-center">
          <i class="vps vps-ban fs-2 text-danger me-3"></i>
          <div class="fs-6 me-5" v-translate>
            {{msg}}
          </div>
        </div>
        <span class="vps vps-times-circle fs-5 float-end" @click="removeWarning"></span>
      </div>
      <Form  @submit="onSubmit" v-if="!showCashDrawerInput && !hideForm">
        <div class="multiselect-sm scroll-hidden-clear mb-2 " >
          <label for="outlet" v-translate >Select Outlet</label>
          <Field label="Outlet" name="outlet" id="outlet" v-model="this.counterPnl.outlet" title="Supplier" rules="required" >
            <Multiselect
                v-model="this.counterPnl.outlet"
                valueProp="id"
                label="name"
                :close-on-select="true"
                :options="outlets"
                @change="this.counterPnl.counter=null"
                :placeholder="this.$gettext('Select Outlet')"
            />
          </Field>

          <ErrorMessage name="outlet"  class="apbd-v-error"/>
        </div>
        <div v-if="this.counterPnl.outlet" class="mb-2" >
          <label for="counter" v-translate>Select Counter</label>
          <Field v-if="this.getCounter.length>0" label="Counter" name="counter" id="counter" v-model="this.counterPnl.counter" title="Supplier" rules="required" >
            <Multiselect
                v-model="this.counterPnl.counter"
                valueProp="id"
                label="name"
                :close-on-select="true"
                :options="getCounter"
                :placeholder="this.$gettext('Select Counter')"
            />
          </Field>
          <div v-else class="alert alert-danger align-items-center">
            <div class="fs-6 me-5" v-translate>
              {{this.$translateGettext('No counter found for this outlet,please add a counter or choose another outlet to proceed.')}}
            </div>
          </div>
          <ErrorMessage name="counter"  class="apbd-v-error"/>
        </div>
        <div v-if="!showCashDrawerInput">
          <button type="submit" v-if="!isShowLoader && !showCashDrawerInput" :disabled="(this.counterPnl.counter=='' || this.counterPnl.counter==null)" class="btn btn-sm btn-theme" v-translate >Submit </button>
          <Rolling  v-if="isShowLoader" />
        </div>

      </Form>
    </div>
  </div>
</template>

<script>
import { Form,Field,ErrorMessage  } from "vee-validate";
import Multiselect from '@vueform/multiselect'
import {mapGetters} from 'vuex'
import Rolling from "./Rolling";
export default {
  name: "ChooseOutletPanel",
  data() {
    return {
      showCashDrawerInput: false,
      counterPnl: {
        outlet: this.$store.state.currentPlace.outlet,
        counter: this.$store.state.currentPlace.counter,
        cd_balance: 0.00,
        is_new: false,
        is_submitted: false
      },
      msg: '',
      showInput: false,
      isShowLoader: false,
      hideForm: true,
      showErrorMsg: false,
      onLogout: false
    }
  },
  components: {
    Rolling,
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  computed: {
    ...mapGetters({
      'user': 'getLoggedUserData',
      'outlets': 'getOutlets',
      'isSingle': 'isSingleDrawer',
      'currentOutlet': 'getCurrentPlace'
    }),
    getCounter() {
      try {
        let counters = this.outlets.filter((item) => item.id == this.counterPnl.outlet).pop();
        return counters.counters;
      } catch (e) {
        return [];
      }
    }
  },
  async mounted() {
    await this.checkSingleOutlet();
    this.$store.state.isShowGlobalLoader = false;
  },
  methods: {
    checkSingleOutlet() {
      try {
        if (this.outlets.length>0){
          if (this.outlets.length==1)
          {
            let singleOutlet = this.outlets[0];
            this.counterPnl.outlet = singleOutlet.id;
            if (singleOutlet.counters.length == 1)
            {
                this.counterPnl.counter = singleOutlet.counters[0].id;
                this.onSubmit();
            }else {
              this.onSubmit();
            }
          }
          this.hideForm=false;
        }else {
          this.msg=this.$translateGettext('No outlet found,please add outlet and counter first from admin panel');
          this.showErrorMsg=true;
          this.hideForm=true;
        }
      }catch (e) {
        console.log(e.message);
      }
    },
    closeOutletPnl() {
      this.$store.state.currentPlace.is_submitted = true;
      this.$store.state.showCdCloseBtn = false;
    },
    makelogout() {
      this.onLogout = true;
      this.$store.dispatch('userLogOut', {callback: this.logOut_callback});
    },
    logOut_callback(status, msg) {
      if (status) {
        this.onLogout = false;
        this.$router.push('/login');
        this.$store.commit('setLogout');
      }
    },
    removeWarning() {
      this.msg = '';
      this.showErrorMsg = false;
    },
    onSubmit() {
      this.isShowLoader = true;
      this.$store.dispatch('selectOutletPanel', {
        Outlet: {
          outlet: this.counterPnl.outlet,
          counter: this.counterPnl.counter,
          is_submitted:false,
        }, callback: this.choosen_outlet_callback
      });
    },
    choosen_outlet_callback(status, msg, data) {
      this.isShowLoader = false;
      if (status) {
        if (data.is_submitted)
        {
          this.$eventBus.$emit("outlet-ready");
          this.$eventBus.$emit('callAfterLogin');
          this.$router.push(this.$route.query.redirect || '/');
        }
        this.counterPnl.cd_balance = data.cd_balance;
        this.showCashDrawerInput = true;
        this.$store.state.showCdCloseBtn = false;
      } else {
        this.showErrorMsg = true;
        this.msg = msg;
      }

    }
  }
}
</script>

<style scoped>

</style>
