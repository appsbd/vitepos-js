<template>
<module-container add-form-title="Customer">
  <template v-slot:module-body="c_props">
    <div class="d-flex justify-content-end">
    <button class="btn btn-sm btn-primary" @click="c_props.showModal(true)">Add Customer</button>

      <button class="btn btn-sm btn-primary" @click="c_props.showModal(false,{id:1})">Edit Customer</button>
    </div>
  </template>
  <template v-slot:add-form-modal="m_props" >
      <customer-add
          :module-id="moduleId"
          :close-modal="m_props.closeModal"
          :is-modal-edit="m_props.modalEdit"
          :edit-params="m_props.modalParam">
      </customer-add>
  </template>
</module-container>
</template>

<script>
import ModuleContainer from "@/components/ModuleContainer";
import CustomerAdd from "@/modules/customer/CustomerAdd";
export default {
  name: "CustomerModule",
  props:{
    moduleId:{
      type:String,
      default:'CustomerModule',
    }
  },
  components: {CustomerAdd, ModuleContainer}
}
</script>
admin-ajax.php?action=apbd-vite-pos_AJ_CustomerModule_data
<style scoped>

</style>