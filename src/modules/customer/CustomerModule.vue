<template>
  <div class="card m-3">
    <div class="card-body p-3">
      <div class="d-flex justify-content-end">
        <button class="btn btn-sm btn-primary" @click="showModal(true)">Add Customer</button>
        <button class="btn btn-sm btn-primary" @click="showModal(false,{id:1})">Edit Customer</button>
      </div>
    </div>
  </div>
  <modal v-if="isShowModal" modal-size="modal-xl" :is-modal-visible="true" @close="closeModal">
    <template v-slot:header>
      Customer Add/Edit
    </template>
    <template v-slot:body>
      <customer-add/>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal" v-translate>Customer
        Close
      </button>
    </template>
  </modal>
</template>

<script>
import ModuleContainer from "@/components/ModuleContainer";
import CustomerAdd from "@/modules/customer/CustomerAdd";
import Modal from "@/components/Modal";

export default {
  name: "CustomerModule",
  props: {
    moduleId: {
      type: String,
      default: 'CustomerModule',
    }
  },
  components: {Modal, CustomerAdd, ModuleContainer},
  data() {
    return {
      isShowModal: false
    }
  },
  methods: {
    closeModal() {
      this.isShowModal = false
    },
    showModal(isNew, prms) {
      this.isShowModal = true;
    },
  }
}
</script>
admin-ajax.php?action=apbd-vite-pos_AJ_CustomerModule_data
<style scoped>

</style>