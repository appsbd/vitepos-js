<template>
  <div>
    <module-loader class="p-3" msg="Loading Settings" v-if="module_loading"/>
    <div class="ps-3 pe-3 pb-3" v-if="!module_loading">
      <div class="row">
        <div class="col-sm">
          <SettingsForm :on-submit="onSubmit" class="needs-validation ">
            <div class="card apbd-theme-card">
              <div class="card-body apbd-loading-target p-3">
                <div class="mb-3">
                  <label for="barcode_type" class="form-label" v-translate>Barcode Field</label>
                  <Field label="Barcode Field" class="form-select" name="barcode_field"
                         v-model="setting['barcode_field']"
                         rules="required" id="barcode_type"
                         as="select">
                    <option value="" v-translate>Select</option>
                    <option value="ID" v-translate>Product ID</option>
                    <option value="SKU" v-translate>SKU</option>
                    <option value="CUS" v-translate>Custom Barcode</option>
                  </Field>
                  <ErrorMessage name="barcode_field" class="apbd-v-error"/>
                </div>
                <div class="mb-3">
                  <label for="pos_row_col" class="form-label" v-translate>POS Products Per Row</label>
                  <Field label="Barcode Field" class="form-select" name="pos_row_col"
                         v-model="setting['pos_row_col']"
                         id="pos_row_col"
                         as="select">
                    <option value="" v-translate>Select</option>
                    <option v-for="col in 4" :value="col+1" ><translate  :translate-params="{col:col+1}"> %{col} Products Per Row</translate></option>
                  </Field>
                </div>
                <div class="mb-3">
                  <label for="new_badge_duration" class="form-label"><translate>New Product Badge Duration</translate> <i class="vps vps-help-circle" v-tooltip="this.$translateGettext('Set the duration in days for new badge on product')"></i></label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="new_badge_duration" v-model="setting['new_badge_duration']">
                    <span class="input-group-text" v-translate>days</span>
                  </div>
                  <small  class="help-text text-muted small-note text-italic">
                    <translate  :translate-params="{dayset:setting['new_badge_duration']?setting['new_badge_duration']:0}">The new badge will display up to %{dayset} days from product creation date.</translate>
                  </small>
                </div>
                <div class="mb-3">
                  <label for="login_type" class="form-label" v-translate>POS Login Type</label>
                  <Field label="POS Login Type" class="form-select" ID="login_type" name="login_type"
                         v-model="setting['login_type']"
                         as="select">
                    <option value="" v-translate>Vitepos Login</option>
                    <option value="W" v-translate>Wordpress Login</option>
                  </Field>
                  <ErrorMessage name="login_type" class="apbd-v-error"/>
                </div>

                <div class="mb-3" v-if="setting['login_type']=='W'">
                  <label for="wp_login_url" class="form-label" v-translate>Wordpress Login URL</label>
                  <Field :placeholder="settingsStore?.login_ph" label="Wordpress Login URL" class="form-control" name="wp_login_url"
                         v-model="setting['wp_login_url']"
                         id="wp_login_url"/>
                  <ErrorMessage name="wp_login_url" class="apbd-v-error"/>
                  <div  class="form-text" v-translate>Keep blank to use default wordpress login.</div>
                </div>

              </div>
              <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-sm btn-theme" type="submit" v-translate>Save</button>
              </div>
            </div>
          </SettingsForm>
        </div>
        <div class="col-sm pt-3 pt-sm-0">
          <SettingsForm :on-submit="onSubmit" class="needs-validation ">
            <div class="card apbd-theme-card ">
              <div class="card-body apbd-loading-target p-3 o-unset">
                <image-selector title="POS Logo" container-width="100" container-height="66" class="mb-3" img-width="166" img-height="60"  v-model="setting.pos_logo">
                  <template v-slot:info>
                    <small class="info-msg">
                      <span>
                        {{this.$translateGettext('Click the box to select or remove %{fileName}.',{fileName:'Logo'})}}
                      </span><br>
                      <translate :translate-params="{logoHeight:'60px'}">Recommend logo height %{logoHeight}.</translate><br>
                      <translate :translate-params="{logoWidth:'256px',logoHeight:'256px'}">Best size is %{logoWidth} in width and %{logoHeight} in height.</translate>
                    </small>
                  </template>
                </image-selector>
                <image-selector title="Favicon" container-width="100" class="mb-3" img-width="256" img-height="256"  v-model="setting.pos_fav_icon">
                  <template v-slot:info>
                    <small class="info-msg">
                      <span>
                        {{this.$translateGettext('Click the box to select or remove %{fileName}.',{fileName:'Favicon'})}}
                      </span><br>
                      <translate :translate-params="{logoHeight:'256px'}">Recommend logo height %{logoHeight}.</translate><br>
                      <translate :translate-params="{logoWidth:'256px',logoHeight:'256px'}">Best size is %{logoWidth} in width and %{logoHeight} in height.</translate>
                    </small>
                  </template>
                </image-selector>
                <div class="mb-3">
                  <label for="POS_link" class="form-label" v-translate>POS Link Type</label>
                  <Field label="POS Link Type" class="form-select" name="POS_link" v-model="setting['POS_link']"
                         rules="" id="POS_link"
                         as="select">
                    <option value="" v-translate>Default</option>
                    <option value="page" v-translate>Page</option>
                  </Field>
                  <ErrorMessage name="barcode_field" class="apbd-v-error"/>
                </div>
                <div v-if="!setting.POS_link || setting.POS_link==''" class="card bg-light mb-3">
                  <div class="card-body p-1">
                   <translate>POS Link:</translate>  <a :href="settingsStore?.default_link">{{ settingsStore?.default_link }}</a>
                  </div>
                </div>
                <div class="mb-3"  v-if="setting?.POS_link=='page'">
                  <label for="pos_page" class="form-label" v-translate>POS Page</label>

                  <Field  label="POS Page" class="form-select"
                         name="pos_page" v-model="setting['pos_page']"
                         rules="required" id="pos_page"
                        >
                    <multiselect v-model="setting['pos_page']" label="page"  multiple="false"
                                 :placeholder="this.$gettext('Search/Choose Page')" :searchable="true" :options="this.settingsStore.pages"
                    ></multiselect>

                  </Field>
                  <ErrorMessage name="email" class="apbd-v-error"/>
                </div>
                <div class="mb-3"  >
                  <label for="pos_customer" class="form-label" v-translate>Default Customer (Optional)</label>
                  <Field  label="Default Customer" class="form-select"
                          name="pos_customer" v-model="setting['pos_customer']"
                          id="pos_customer"
                  >
                    <multiselect v-model="setting['pos_customer']" label="name"  multiple="false"
                                 :placeholder="this.$gettext('Search/Choose customer')"
                                 @search-change="getSearchKey"
                                 :clearOnSelect="true"
                                 :searchable="true"
                                 :loading="searching"
                                 :close-on-select="true"
                                 :options="this.getCustomersData"
                                 valueProp="id"
                                 @clear="this.setting['pos_customer']=''"
                    ></multiselect>

                  </Field>
                  <small class="help-text text-warning small-note text-italic" v-translate>
                    You can select the default customer for order processing. If not selected then the order will be processed as a guest user. Note that, if the customer is selected from the POS, that customer will remain in the selected state.                  </small>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-sm btn-theme" type="submit" v-translate>Save</button>
              </div>
            </div>
          </SettingsForm>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import {mapStores} from 'pinia'
import {useSettingsStore} from "@/stores/settings";
import ModuleLoader from "@/components/ModuleLoader";
import {VueEditor} from "vue3-editor";
import {Field, ErrorMessage, Form} from "vee-validate";
import SettingsForm from "@/components/SettingsForm";
import AppSkinColorPicker from "@/components/AppSkinColorPicker";
import Multiselect from '@vueform/multiselect'
import ImageSelector from "@/components/ImageSelector";

export default {
  name: "basicSettings",
  components: {
    ImageSelector,
    AppSkinColorPicker,
    SettingsForm,
    ModuleLoader,
    VueEditor,
    Multiselect,
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      module_loading: true,
      searching: false,
      timer:null,
      setting: {
        pos_customer:'',
      },
      customers: [],
      initialCustomer:[],
      pages: {},
      app_color:"def",
      colors: [
        {name: "def", title: "Default", color: "#2563EB"},
        {name: "cyan", title: "Gray", color: "#00ACC1"},
        {name: "green", title: "Green", color: "#4CAF50"},
        {name: "purple", title: "purple", color: "#7B1FA2"},
        {name: "pink", title: "pink", color: "#F06292"},
        {name: "red", title: "Red", color: "#b63431"},
        {name: "orange", title: "orange", color: "#F57C00"},
        {name: "gray", title: "Gray", color: "#757575"},
        {name: "dark", title: "Dark", color: "#000000"},
      ]
    }
  },
  computed: {
    ...mapStores(useSettingsStore),
    getCustomersData()
    {
      let data= [];
      try {
        var ids = new Set(this.initialCustomer.map(d => d.id));
        data= [...this.initialCustomer,...this.customers.filter(d => !ids.has(d.id))];
        return data;
      }catch (e)
      {
        console.log(e.message);
        return [];
      }
    }
  },
  async mounted() {
    try {
      let options = await this.settingsStore.loadSettings();
      if (options?.basic_settings) {
        this.setting = options.basic_settings;
      }
      if (options?.pos_customer_obj!==null)
      {
        this.initialCustomer.push(options?.pos_customer_obj?options.pos_customer_obj:[]);
      }
      this.module_loading = false;
    } catch (e) {
      this.$appsbdUtls.ShowNotification("Server Connection failed", false);
      this.module_loading = false;
    }
    if (!this.setting.pos_color) {
      this.setting.pos_color = 'def';
    }
    if (!this.setting.offline_order_status) {
      this.setting.offline_order_status = 'N';
    }
  },
  methods: {
     getSearchKey(query){
      try {
        clearTimeout(this.timer);
      }catch (e) {
      }
       if (query!='')
       {
         this.searching=true;
         this.timer = setTimeout(async () => {
           this.customers =await this.settingsStore.getCustomers(query);
           this.searching=false;
         }, 1000);
       }
    },
    async onSubmit() {
      let response = await this.settingsStore.updateSettings({...this.setting});
      if (response) {
        this.$appsbdUtls.ShowServerResponseNotification(response.msg, 5000);
      }
    },
    removePosLogo(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setting.pos_logo = '';
    },
    PosLogoSelect() {
      const thisObj = this;
      //this.$appsbdUtls.WPFileChooser("")
      this.$appsbdUtls.WPMediaImageCropped({
        width:166,
        height:60,
        title:"POS Logo",
        button_text:"Select Logo",
        flex_width : true,
        callback:function (file) {
          thisObj.setting.pos_logo = file.url;
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.pos-logo-img{
  border: 1px solid #ccc;

  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 24px -5px #ccc;
  background: rgba(255, 255, 255, 0.49);
  >img{
    max-width: 100px;
    max-height: 60px;
    min-height: 60px;
  }
  >span {
    min-width: 100px;
    min-height: 60px;
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    > i {
      color:#ccc;
      font-size: 24px;
    }
  }
}
</style>
