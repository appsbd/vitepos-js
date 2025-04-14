<template>
  <Form ref="main_form" :class="is_sending?'apbd-form-sending':''" @submit="onFormSubmit"  class="needs-validation">
    <slot/>
  </Form>
</template>

<script>
import {Form} from "vee-validate";

export default {
  name: "SettingsForm",
  props:{
    onSubmit: {
      type: Function,
      default: ()=>{}
    },
  },
  data(){
    return{
      is_sending:false,
    }
  },
  components: {
    Form,
  },
  methods: {
    async onFormSubmit() {
      this.is_sending=true;
      if (this.onSubmit && typeof this.onSubmit === 'function') {
        await this.onSubmit();
      }
      this.is_sending=false;
    },
  }
}
</script>