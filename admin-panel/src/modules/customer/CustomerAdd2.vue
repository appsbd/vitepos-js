<template>
<modal modal-size="modal-md" :is-modal-visible="true" @close="closeModal">
  <template v-slot:body>
    <input type="text">
    <div v-if="isModalEdit">
    its edit mode
      {{editParams}}
    </div>
    <div v-else> its add mode</div>
  </template>
  <template v-slot:footer>
    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal" v-translate >Close</button>
  </template>
</modal>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "CustomerAdd",
  components: {Modal},
  props:{
    moduleId:{
      type:String,
      default:'non-id'
    },
    closeModal:{
      type:Function,
      default:function(){}
    },
    isModalEdit: {
      type:Boolean,
      default:false
    },
    editParams: {
      default: null
    }
  }
}
</script>

<style scoped>

</style>