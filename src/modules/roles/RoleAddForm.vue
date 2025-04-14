<template>
<div class="row">
    <div class="col-sm">
      <div class="mb-2">
        <label for="name" v-translate>Role Name</label>
        <Field label="Role Name" type="text" v-model="formProps.name" rules="required" name="name"
               id="name" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="name" class="apbd-v-error"/>
      </div>
    </div>
    <div class="col-sm">
      <div class="mb-2">
        <label for="max_discount" v-translate>Max Discount</label>
        <div class="input-group input-group-sm" v-tooltip="'Need pro version to change max discount'">
          <Field label="Max Discount" type="number" disabled value="100" name="max_discount"
                 id="max_discount" class="form-control "/>
          <span class="input-group-text input-group-text-sm" id="basic-addon2">%</span>
        </div>
        <ErrorMessage name="max_discount" class="apbd-v-error text-nowrap"/>
      </div>
    </div>
</div>
  <div class="row">
  <div class="form-row">
    <div class="col-sm">
      <div class=" mb-2">
          <label for="role_description" v-translate>Role Description</label>
          <Field as="textarea" label="Role Description" type="text" v-model="formProps.role_description" rules="" name="role_description"
                 id="role_description" class="form-control form-control-sm form-control-md"/>
          <ErrorMessage name="role_description" class="apbd-v-error"/>
       </div>
    </div>
  </div>
</div>
</template>

<script>
import { Field,ErrorMessage  } from "vee-validate";
export default {
  name: "RoleAddForm",
  components: {
    Field, ErrorMessage
  },
  props: {
    formProps: {
      type: Object,
      default: {}
    }
  },
}
</script>

<style scoped>

</style>
