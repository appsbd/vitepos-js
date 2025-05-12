<template>
  <!-- Modal -->
  <div class="modal fade show app-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div :class="modalSize" class="modal-dialog  modal-dialog-centered" role="document">
      <div class="modal-content">
        <div v-if="!hideHeader" class="modal-header">
          <slot name="header">
            This is the default header!
          </slot>
          <button v-if="!isHideBtn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
        </div>
        <Form :as="hideForm?'div':'form'" ref="modal_form"  @submit="onSubmit" @reset="clearForm"  class="needs-validation" >
          <div  class="modal-body" :class="bodyClass">
            <response-msg :disable-remove="true" :message="modalMsg"/>
            <slot v-if="!isHideFooter" name="body"  >
              This is the default body!
            </slot>

            <div class="modal-loader" v-show="isShowLoader">
              <div class="loader-content">
                <slot name="loader">
                 <AppLoader :no-drop-shadow="true" :msg="loading_msg"/>
                </slot>
              </div>
            </div>
          </div>
          <div v-if="!hideFooter && !isHideFooter && !isShowLoader" class="modal-footer">
                <slot name="footer" :close="close">
                  This is the default footer!
                </slot>
          </div>
          <div v-if="!hideFooter && ( isHideFooter || isShowLoader)" class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close" v-translate >Close</button>
          </div>

        </Form >
      </div>
    </div>
  </div>
</template>

<script>
import {Form} from "vee-validate";
import AppLoader from "@/components/AppLoader";
import ResponseMsg from "@/components/ResponseMsg";
export default {
  name: 'Modal',
  props: {
    isModalVisible: Boolean,
    modalSize:String,
    modalMsg:{
      type:String,
      default:""
    },
    hideHeader:{
      type:Boolean,
      default:false
    },
    hideFooter:{
      type:Boolean,
      default:false
    },
    hideCrossBtn:{
      type:Boolean,
      default:false
    },
    hideForm:{
      type:Boolean,
      default:false
    },
    bodyClass:{
      type:String,
      default:""
    },
    disableRemove:{
      type:Boolean,
      default:true
    }
  },
  components: {
    ResponseMsg,
    AppLoader,
    Form
  },
  data() {
    return {
      isShowLoaderProp:false,
      modalLoadingMsg:'',
      modalMsgOnly:{},
      isHideFooter:false,
      initialValues:{},
    }
  },
  created() {
    if(!this.modalSize){
      this.modalSize="modal-lg";
    }
  },
  mounted() {
    this.clearForm();
  },
  computed:{
    isShowLoader(){
      return this.isShowLoaderProp?this.isShowLoaderProp:false;
    },
    loading_msg(){
      return this.modalLoadingMsg;
    },
    isHideBtn(){
      try {
        return this.hideCrossBtn;
      }catch (e) {
        console.log(e.message);
      }
    }
  },
  methods: {
    onSubmit($event, {resetForm}) {
      this.$emit('onSubmit', {$event, resetForm});
    },
    showLoader(status,msg){
      this.isShowLoaderProp=status;
      this.$emit('loading-status',!this.isShowLoaderProp);
      if(msg) {
        this.modalLoadingMsg = msg;
      }
    },
    close() {
      this.$emit('close');
      this.clearForm();
    },
    clearForm(){
      this.modalMsgOnly= {};
      this.isHideFooter=false;
      this.$refs.modal_form.resetForm();
    },
    returnClear(){
      this.modalMsgOnly= {};
      this.isHideFooter=false;
      this.$refs.modal_form.resetForm();
    },
    showMsgOnly(msg,isHideFooter){
      this.modalMsgOnly=msg;
      this.isHideFooter=isHideFooter;
    },
    setMessageOnly(status){
      this.isHideFooter=status;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal{

  &.show {
    display: block;
    background: rgba(0, 0, 0, 0.47);
  }
}

</style>
