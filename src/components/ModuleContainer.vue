<template>
  <div class="card m-3">
    <div class="card-body p-3">
      <slot name="module-body" :show-modal="showModal">
        <div>Body Is Empty</div>
      </slot>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "ModuleContainer",
  components: {Modal},
  props: {
    moduleId: {
      type: String,
      default: '',
    },
    addFormTitle: {
      type: String,
      default: '',
    }
  },
  emits: {},
  data() {
    return {
      isShowModal: false,
      isEditMode: false,
      dataParams: null
    }
  },
  methods: {
    showModal(isNew,prms) {
      this.isEditMode=!isNew;
      this.dataParams=prms;
      this.isShowModal=true;
    },
    closeModal(){
      this.isShowModal=false;
    }
  }
}
</script>

<style scoped>

</style>