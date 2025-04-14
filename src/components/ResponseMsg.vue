<template>
  <div class="alert alert-danger p-2 justify-content-between d-flex align-items-center" v-if="message?.error" v-for="msg in message.error">
    <div class="d-flex align-items-center">
      <i class="vps vps-x-circle me-1"></i>{{msg}}
    </div>
    <span v-if="!disableRemove" class="vps vps-x float-end" @click="removeWarning"></span>
  </div>
  <div class="alert alert-success p-2 justify-content-between d-flex align-items-center" v-if="message?.info" v-for="msg in message.info">
    <div class="d-flex align-items-center">
      <i class=" vps vps-check-circle me-1"></i>{{msg}}
    </div>
    <span v-if="!disableRemove" class="vps vps-x float-end" @click="removeWarning"></span>
  </div>
  <div class="alert alert-info p-0 justify-content-between d-flex align-items-center" v-if="message?.debug" v-for="msg in message.debug">
    <div class="d-flex align-items-center">
      <i class="vps vps-code me-1"></i>{{msg}}
    </div>
    <span v-if="!disableRemove" class="vps vps-x float-end" @click="removeWarning"></span>
  </div>
  <div class="alert alert-warning p-2 mb-2 justify-content-between d-flex align-items-center" v-if="message?.warning" v-for="msg in message.warning">
    <div class="d-flex align-items-center">
      <i class=" vps-x-circle me-1"></i>{{msg}}
    </div>
    <span v-if="!disableRemove" class="vps vps-x float-end" @click="removeWarning"></span>
  </div>
</template>

<script>
export default {
name: "ResponseMsg",
  props: {
    message: {
      type: Object,
      default: {}
    },
    response_type: {
      type: String,
      default: 'error'
    },
    disableRemove: {
      type: Boolean,
      default: false
    }
  },
  emits:['removeInfo'],
  methods:{
    removeWarning(){
      this.$emit('removeInfo');
    }
  }
}
</script>

<style scoped>

</style>