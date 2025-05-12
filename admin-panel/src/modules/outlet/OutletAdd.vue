<template>
  <div class="row">
    <div class="col-sm">
      <div class=" mb-2">
        <label for="name" v-translate>Name</label>
        <Field label="Name" type="text" v-model="formProps.name" rules="required" name="name"
               id="name" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="name" class="apbd-v-error"/>
      </div>
    </div>
    <div class="col-sm">
      <div class=" mb-2">
        <label for="email" v-translate>Email</label>
        <Field label="Email" type="text" v-model="formProps.email" rules="required|email" name="email"
               id="email" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="email" class="apbd-v-error"/>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-sm">
      <div class=" mb-2">
        <label for="phone" v-translate>Contact No</label>
        <Field label="Contact No" type="text" v-model="formProps.phone" rules="required|numeric" name="contact_no"
               id="phone" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="contact_no" class="apbd-v-error"/>
      </div>
    </div>
    <div class="col-sm">
      <div class=" mb-2">
        <label for="timezone" v-translate>Time Zone</label>
        <multiselect v-model="formProps.wh_timezone" label="Timezone" valueProp="code"
                     placeholder="Select/Search Timezone" :searchable="true" :options="countryStore.timezones"
        ></multiselect>

      </div>
    </div>

  </div>
    <div class="row">
      <div class="col-sm">
        <div class="mb-2 multiselect-sm">
          <label for="country_name" v-translate>Select Country</label>
          <Field label="Country" rules="" name="country_name" id="country_name"
                 v-slot="{field}" v-model="formProps.country">
            <multiselect v-model="formProps.country"
                         label="name"
                         @clear="formProps.state=''"
                         @change="formProps.state=''"
                         valueProp="code"
                         autocomplete="off"
                         placeholder="Select/Search Country"
                         :searchable="true"
                         :options="countryStore.countries"
            ></multiselect>
          </Field>
          <ErrorMessage name="country_name" class="apbd-v-error"/>
        </div>
      </div>
    <div class="col-sm">
      <div class=" mb-2">
        <label for="state" v-translate>State/District</label>
          <multiselect  v-model="formProps.state" label="name" valueProp="id" id="state"
               autocomplete="off" placeholder="Select/Search State or Dist."    :searchable="true" :options="formProps.country?selected_states:[]"
          />
      </div>
    </div>


  </div>
  <div class="row">
    <div class="col-sm">
      <div class=" mb-2">
        <label for="city" v-translate>City</label>
        <Field label="City" type="text" v-model="formProps.city" name="city"
               id="city" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="city" class="apbd-v-error"/>
      </div>
    </div>
    <div class="col-sm">
      <div class=" mb-2">
        <label for="zip_code" v-translate>Zip Code</label>
        <Field label="Zip Code" type="text" v-model="formProps.zip_code" name="zip_code"
               id="zip_code" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="zip_code" class="apbd-v-error"/>
      </div>
    </div>
  </div>
  <div class="row">

    <div class="col-sm">
      <div class=" mb-2">
        <label for="street" v-translate>Street</label>
        <Field label="Street" type="text" v-model="formProps.street" name="street"
               id="street" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="street" class="apbd-v-error"/>
      </div>
    </div>
  </div>
  <div class="row">

    <div class="col-sm">
      <div class=" mb-2">
        <label for="allowed_ip" v-translate>Allowed Ip</label>
        <Field label="Allowed Ip" type="text" v-model="formProps.allowed_ip" name="allowed_ip"
               id="allowed_ip" class="form-control form-control-sm form-control-md"/>
        <ErrorMessage name="allowed_ip" class="apbd-v-error"/>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <div class="d-flex align-items-center">
      <label for="status" class="me-3" v-translate>Status</label>
      <div class="form-check form-switch form-switch-sm mt-0">
        <input class="form-check-input" v-model="formProps.status" type="checkbox" id="status" name="status">
      </div>
    </div>

  </div>
</template>
<script setup>
/*import {useCountryStore} from "@/stores/country";

const countryStore=useCountryStore();
countryStore.loadCountries();*/
</script>

<script>
import { mapStores,mapState } from 'pinia'
import { Field,ErrorMessage  } from "vee-validate";
import {useCountryStore} from "@/stores/country";
import Multiselect from '@vueform/multiselect'
export default {
  name: "OutletAdd",
  components: {
    Field, ErrorMessage,
    Multiselect
  },
  props: {
    formProps: {
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      previous_country:""
    }
  },
  emits:['changeStatus'],
  computed: {
    ...mapStores(useCountryStore),
    ...mapState(useCountryStore, [ 'countries']),
    selected_states(){
      try {
        if (this.previous_country != undefined && this.previous_country != this.formProps.country) {
          this.formProps.state = "";
          this.previous_country = this.formProps.country;
        }
        let country = this.countries.find((country) => {
          return country.code == this.formProps.country;
        });
        if (country && country.states) {
          return country.states;
        }
      }catch (e) {
        return [];
      }
      return [];
    },
  },
  mounted() {
    this.countryStore.loadCountries();
    this.countryStore.loadTimezone();
    this.previous_country=this.formProps.country;
  },
  methods:{

    changeOutletStatus()
    {
      this.$emit('changeStatus');
    }
  }
}
</script>

<style scoped>

</style>