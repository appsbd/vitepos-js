<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5" v-translate>Sign In</h5>
            <div v-show="showErrorMsg" class="alert alert-danger align-items-center" :class="showErrorMsg?'d-flex':''">
              <i class="vps vps-ban fs-2 text-danger me-3"></i>
              <div class="fs-6 me-5" v-translate>
                {{msg}}
              </div>
              <span class="vps vps-times-circle fs-5 float-end" @click="removeWarning"></span>
            </div>
            <Form  @submit="onSubmit">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" name="Username" id="floatingInput" v-model="login_form.username" placeholder="name@example.com">
                <label for="floatingInput" ><translate>Username or Email address</translate></label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" name="Password" v-model="login_form.password" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword"><translate>Password</translate></label>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit"><span v-show="!isShowLoader" ><translate>Sign In</translate></span> <i class="vps vps-refresh " :class="isShowLoader?'slower animated infinite apf-spin':''" v-show="isShowLoader"></i></button>
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
export default {
  name: "LoginForm",
  data()
  {
    return{
      login_form: {
        username: "",
        password: "",
      },
      msg:'',
      isShowLoader:false,
      showErrorMsg:false
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits:['logedIn'],
  methods:{
    removeWarning(){
      this.msg='';
      this.showErrorMsg = false;
    },
    onSubmit(){
      this.isShowLoader=true;
      this.$store.dispatch('userLogin', {
       login_form: this.login_form, callback: this.login_callback
      });
    },
    login_callback(status,msg,data)
    {
      this.isShowLoader=false;
      if(status){
        this.$emit('logedIn');
      }else {
        this.msg=msg;
        this.showErrorMsg=true;
        this.login_form.password="";
      }

    }
  }
}
</script>

<style scoped>

</style>