<template>
  <!-- Modal -->
  <div class="modal fade show app-modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" >
    <div :class="modalSize" class="modal-dialog  modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            This is the default header!
          </slot>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
        </div>
        <Form ref="modal_form"  @submit="onSubmit" @reset="clearForm" class="needs-validation" >
          <div   class="modal-body">
            <ResponseMsg :message="modalMsgOnly" />
            <div v-show="!hideBody">
              <slot name="body" >
                This is the default body!
              </slot>
            </div>
            <div class="modal-loader" v-show="isShowLoader">
              <div class="loader-content">
                <slot name="loader">
                  <app-loader :msg="loading_msg"/>
                </slot>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-show="!hideBody && !isShowLoader">
                <slot name="footer" :close="close">
                  This is the default footer!
                </slot>
          </div>
          <div class="modal-footer" v-show="hideBody || isShowLoader">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close" v-translate >Close</button>
          </div>

        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Form,useForm} from "vee-validate";

import ResponseMsg from "./ResponseMsg";
import AppLoader from "./AppLoader";
export default {
  name: 'Modal',
  props: {
    isModalVisible: Boolean,
    modalSize:String,
    formInitialValues:{
      default:{}
    }
  },
  components: {
    AppLoader,
    ResponseMsg,
    Form
  },
  data() {
    return {
      isShowLoaderProp:false,
      hideBody:false,
      modalLoadingMsg:'',
      modalMsgOnly:{},
      modalMsgOnlyType:'success',

    }
  },
  created() {
    if(!this.modalSize){
      this.modalSize="modal-lg";
    }
  },
  mounted() {
    //this.clearForm();
  },
  computed:{
    isShowLoader(){
      return this.isShowLoaderProp?this.isShowLoaderProp:false;
    },
    loading_msg(){
      return this.modalLoadingMsg;
    }
  },
  methods: {
    onSubmit($event) {
      this.$emit('onSubmit', $event);
    },
    showLoader(status, msg) {
      this.isShowLoaderProp = status;
      this.$emit('loading-status', !this.isShowLoaderProp);
      if (msg) {
        this.modalLoadingMsg = msg;
      }
    },
    close() {
      this.hideBody=false;
      this.modalMsgOnly={};
      this.clearForm();
      this.$emit('close');
    },
    clearForm() {
      try {
        this.initialValues = {};
        this.$refs.modal_form.setValues({});
        this.$refs.modal_form.resetForm();
      } catch (e) {
        console.log(e.message);
      }
    },
    showMsgOnly(msg,hideBody) {
      this.modalMsgOnly = msg;
      this.hideBody=hideBody;
    },
    addError(msg) {
      if (!this.modalMsgOnly.error) {
        this.modalMsgOnly = {
          info: [],
          error:[],
        }
      }
      this.modalMsgOnly.error.push(msg);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {

  &.show {
    display: block;
    background: rgba(0, 0, 0, 0.47);

    .btn-close {
      background: transparent var(--bs-btn-close-bg) center / 1em auto no-repeat !important;
      border: none !important;
    }
  }
}

</style>
