<template>
  <div class="">
    <div class="card card-theme mb-3">
      <div class="card-header bg-theme" v-translate>Delete Role Details</div>
      <div class="card-body p-0">
        <table class="table role-dtls-table m-0">
          <tbody>
          <tr>
            <th v-translate>
              Role Name
            </th>
            <th>:</th>
            <td>
              {{role?.name}}
            </td>
          </tr>
          <tr>
            <th v-translate>
              Role Description
            </th>
            <th>:</th>
            <td>
              {{role?.role_description}}
            </td>
          </tr>
          </tbody>


        </table>
      </div>
    </div>
    <div class="card text-bg-warning bg-warning">
      <div class="card-body" v-translate>
        To delete role, you need to move current users of this roles to another role. Please choose move to role below
      </div>
    </div>
    <div class="row mt-3">
      <div class="form-row">
        <div class="col-sm">
          <div class=" mb-2">
            <label for="slug" v-translate>User Move to </label>
            <Field as="select"  label="Move to Role " type="text" v-model="formProps.slug" rules="required" name="slug"
                   id="slug" class="form-select form-select-sm form-control-md">
              <option value="" v-translate>Select</option>
              <template v-for="roleobj in this.roleStore?.gridData?.rowdata" >
                <option v-if="roleobj.slug != role.slug" :value="roleobj.slug">
                  {{roleobj.name}}
                </option>
              </template>
            </Field>
            <ErrorMessage name="slug" class="apbd-v-error"/>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {mapStores} from 'pinia'
import {useRoleStore} from "@/stores/role";
import { Field,ErrorMessage  } from "vee-validate";
export default {
  name: "RoleDeleteForm",
  components: {
    Field, ErrorMessage
  },
  props: {

    formProps: {
      type: Object,
      default: {}
    }
  },
  data(){
    return{
      role:{}
    }
  },
  computed:{
    ...mapStores(useRoleStore)
  },
  methods:{
    SetRole(role){
      this.role=role;
      this.formProps.role_id=role?.id;
    }
  }
}
</script>

<style scoped lang="scss">
.role-dtls-table{
  tr{
    th{
      width: 10px;
    }
    th:first-child{
      width:120px;
    }


  }
}
</style>