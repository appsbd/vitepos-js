<template>
<div class="row">
  <div class="col-sm">
    <div class=" mb-2">
        <label for="name" v-translate>Counter Name</label>
        <Field label="Counter Name" type="text" v-model="formProps.name" rules="required" name="name"
               id="name" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="name" class="apbd-v-error"/>
     </div>
  </div>
  <div class="col-sm">
    <div class=" mb-2">
        <label for="counter_no" v-translate>Counter No</label>
        <Field label="Counter No" type="text" v-model="formProps.counter_number" rules="required" name="counter_no"
               id="counter_no" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="counter_no" class="apbd-v-error"/>
     </div>
  </div>
</div>
</template>

<script>
import { Field,ErrorMessage  } from "vee-validate";
export default {
  name: "CounterAdd",
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