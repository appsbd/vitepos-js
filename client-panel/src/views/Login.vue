<template>
  <div class="container">
    <div class="row">
      <div v-if="isHideForm" class="ad-global-loader">
        <app-loader class="v-align-m" msg="Loading..." />
      </div>
      <div  v-else class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5" v-translate>Sign In</h5>
              <div v-show="showErrorMsg || this.isPartialOffline" class=" align-items-center" :class="showErrorMsg||this.isPartialOffline?'w-100':''">
                <ResponseMsg :message="errorMessageStr" :disable-remove="false" @removeInfo="removeWarning" />
                <!--<i class="vps vps-ban fs-2 text-danger me-3"></i>
                <div class="fs-6 me-5"  >
                  {{errorMessageStr}}
                </div>
                <span class="vps vps-times-circle fs-5 float-end" @click="removeWarning"></span>-->
              </div>

              <Form  @submit="onSubmit">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" name="Username" id="floatingInput" v-model="login_form.username" placeholder="name@example.com">
                  <label for="floatingInput" ><translate>Username or Email address</translate></label>
                </div>
                <div class="form-floating mb-3">
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" name="Password" v-model="login_form.password" id="floatingPassword" placeholder="Password">
                  <i @click="passVisibility" type="button" class="vps show-pass-icon" :class="showPassword?'vps-eye':'vps-eye-off'" ></i>
                  <label for="floatingPassword"><translate>Password</translate></label>
                </div>
                <div class="d-grid">
                  <button :disabled="this.isPartialOffline" class="btn btn-theme btn-login text-uppercase fw-bold" type="submit"><span v-show="!isShowLoader" ><translate>Sign In</translate></span> <i class="vps vps-refresh " :class="isShowLoader?'slower animated infinite apf-spin':''" v-show="isShowLoader" aria-hidden="true"></i></button>
                </div>
              </Form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form,Field,ErrorMessage  } from "vee-validate";
import {mapGetters} from "vuex";
import ResponseMsg from "../components/ResponseMsg";
import AppLoader from "../components/AppLoader";
import reCaptcha from "@/libraries/reCaptcha";
export default {
name: "Login",
  data()
  {
    return{
      login_form: {
        username: "",
        password: "",
      },
      msg:{
        error:[],
      },
      isShowLoader:false,
      defLoader:false,
      showPassword:false,
      showErrorMsg:false
    }
  },
  computed: {
    ...mapGetters([
      'isPartialOffline',
        'getBasicSettings'
    ]),
    isHideForm()
    {
      try {
        return vitePos.login_type=='W' && process.env.NODE_ENV !== 'development';
      }catch (e) {
        console.log(e.message);
        return false;
      }
    },

    errorMessageStr(){
      if(this.isPartialOffline){
        this.msg={error: [this.$translateGettext("Your are not connected to the internet.")]};
        return this.msg;
      }
      return this.msg;
    }
  },
  mounted() {
    if (!this.$store.state.isLoggedIn) {
      reCaptcha.hide_badge(false);
    }
    if (vitePos.login_type == 'W' && process.env.NODE_ENV !== 'development') {
      this.goToLogin();
    }
  },
  components: {
    AppLoader,
    ResponseMsg,
    Form,
    Field,
    ErrorMessage,
  },
  emits:['logedIn'],
  methods:{
    async goToLogin(){
      this.defLoader=true;
      window.location.href=vitePos.pos_link;
    },
    removeWarning(){
      this.showErrorMsg = false;
    },
  async onSubmit() {
    this.isShowLoader = true;
    let requestParam = {
      login_form: this.login_form, callback: this.login_callback
    };
    if (this.getBasicSettings?.is_rc_v3) {
      try {
        requestParam.login_form.g_token = await this.$reCaptcha.getToken();
      }catch (e) {
        this.isShowLoader = false;
        this.msg= {error: [this.$translateGettext("Try again please, captcha is not ready")]};
        this.showErrorMsg=true;
        return;
      }
    }
    this.$store.dispatch('userLogin', requestParam);
  },
    login_callback(status,msg,data)
    {
      this.isShowLoader=false;
      if(status){
        let userdata= {...data};
        if (userdata.is_temp_pass == 'Y') {
          this.$eventBus.$emit('setPassword', true);
        }
        //this.$eventBus.$emit('callAfterLogin');
        this.$router.push(this.$route.query.redirect || '/');
      }else {
        this.msg=msg;
        this.showErrorMsg=true;
        this.login_form.password="";
      }
    },
    passVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style lang="scss" scoped>
.show-pass-icon{
  position: absolute;
  top: 22px;
  right: 10px;
}
</style>