<template>
  <div class="row" v-if="!isSingle && !isAdvance && has_props">
    <div class="col-sm-4">
      <div class="input-group input-group-sm mb-2 mb-sm-0">
        <div class="input-group-text" v-translate>Property</div>
        <multiselect class="multiselect-sm" v-model="selectedProp" label="name" valueProp="id" :object="true"
                     :placeholder="this.$gettext('Choose property')"  @clear="clearData" @change="changingProp" @select="focusTextBox" :options="filterProps"></multiselect>

      </div>
    </div>
    <div class="col-sm-5" >
      <div v-if="isSelected && this.selectedProp!=null">
        <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="this.selectedProp.type=='dd'">
          <div class="input-group-text">{{this.selectedProp.name}}</div>
          <multiselect class="multiselect-sm" v-model="selectedProp.value" :label="this.selectedProp.optionLabel" :valueProp="this.selectedProp.optionValueProp"
                       :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder:'Choose option'" :options="selectedProp.options"></multiselect>
        </div>
        <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="this.selectedProp?this.selectedProp.type=='t':false">
          <div class="input-group-text">{{this.selectedProp.name}}</div>
          <multiselect v-if="this.selectedProp.options.length>0" :canClear="false" class="multiselect-sm input-operators" v-model="selectedProp.operators" label="symbol" :valueProp="this.selectedProp.options.value"
                       :options="selectedProp.options" :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder:'Choose property'"></multiselect>
          <input type="text" :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder:'Enter value'" ref="text_box" v-model="this.selectedProp.value" class="form-control form-control-sm">
        </div>
        <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="this.selectedProp?this.selectedProp.type=='tr':false">
          <div class="input-group-text">{{this.selectedProp.name}}</div>
          <div class="range-input-panel">
            <input
                v-model="this.selectedProp.value.start"
                class="form-control form-control-sm"
                type="text" ref="input_range_box"
                :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder.start:'Min'"
            />
            <svg
                class="w-4 h-4 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <input
                v-model="this.selectedProp.value.end"
                class="form-control form-control-sm"
                type="text"
                :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder.end:'Max'"
            />
          </div>
        </div>

        <v-date-picker class="input-group input-group-sm mb-2 mb-sm-0" v-if="this.selectedProp?this.selectedProp.type=='d':false" v-model="this.selectedProp.value" :input-debounce="500">
          <template v-slot="{ inputValue, inputEvents }">
            <div class="input-group-text">{{this.selectedProp.name}}</div>
            <input
                class="form-control form-control-sm"
                :value="inputValue"
                v-on="inputEvents"
                :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder:'Choose date'"
            />
          </template>
        </v-date-picker>

        <v-date-picker class="input-group input-group-sm date-range mb-2 mb-sm-0" v-if="this.selectedProp?this.selectedProp.type=='dr':false" v-model="this.selectedProp.value" is-range>
          <template v-slot="{ inputValue, inputEvents }">
            <div class="input-group-text">{{this.selectedProp.name}}</div>
            <div class="range-input-panel">
              <input
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                  class="form-control form-control-sm"
                  :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder.start:'From'"
              />
              <svg
                  class="w-4 h-4 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <input
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  class="form-control form-control-sm"
                  :placeholder="this.selectedProp.placeholder?this.selectedProp.placeholder.end:'To'"
              />
            </div>
          </template>
        </v-date-picker>

      </div>
      <div v-else class="input-group input-group-sm mb-2 mb-sm-0" >
        <div class="input-group-text" v-translate>Value</div>
        <input type="text"  class="form-control form-control-sm">
      </div>
    </div>
    <div class="col-sm-3">
      <button type="button" class="btn btn-sm btn-theme mb-2 me-2 mb-sm-0" @click="searchData" :disabled="getDisStatus" v-translate>Search</button>
      <button type="button" class="btn btn-sm btn-warning mb-2 mb-sm-0" @click="clearSearchData" v-translate :disabled="selectedProp=='' || selectedProp==null?true:false">Reset</button>
    </div>
  </div>
  <div class="row" v-if="!isSingle && isAdvance && has_props">
    <div class=" mb-2" :class="field?.colClass?field.colClass:advanceClass" v-for="(field,index) in filterProps" :key="index">
      <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="field.type=='dd'">
        <div class="input-group-text">{{field.name}}</div>
        <multiselect class="multiselect-sm" v-model="field.value" :label="field.optionLabel" :valueProp="field.optionValueProp"
                     :placeholder="field.placeholder?field.placeholder:'Choose option'" :options="field.options"></multiselect>
      </div>
      <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="field.type=='t'">
        <div class="input-group-text">{{field.name}}</div>
        <multiselect v-if="field.options.length>0" :canClear="false" class="multiselect-sm input-operators" v-model="field.operators" :label="field.optionLabel" :valueProp="field.optionValueProp"
                     :options="field.options"></multiselect>
        <input type="text" ref="text_box" :placeholder="field.placeholder"  v-model="field.value" class="form-control form-control-sm">
      </div>

      <div class="input-group input-group-sm mb-2 mb-sm-0" v-if="field.type=='tr'">
        <div class="input-group-text">{{field.name}}</div>
        <div class="range-input-panel">
          <input
              v-model="field.value.start"
              class="form-control form-control-sm"
              type="text" ref="input_range_box"
              :placeholder="field.placeholder?field.placeholder.start:'Min'"
          />
          <svg
              class="w-4 h-4 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <input
              v-model="field.value.end"
              class="form-control form-control-sm"
              type="text"
              :placeholder="field.placeholder?field.placeholder.end:'Max'"
          />
        </div>
      </div>

      <v-date-picker class="input-group input-group-sm mb-2 mb-sm-0" v-if="field.type=='d'" v-model="field.value" :input-debounce="500">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="input-group-text">{{field.name}}</div>
          <input
              class="form-control form-control-sm"
              :value="inputValue"
              v-on="inputEvents"
              :placeholder="field.placeholder?field.placeholder:''"
          />
        </template>
      </v-date-picker>

      <v-date-picker class="input-group input-group-sm date-range mb-2 mb-sm-0" v-if="field.type=='dr'" v-model="field.value" is-range>
        <template v-slot="{ inputValue, inputEvents }">
          <div class="input-group-text">{{field.name}}</div>
          <div class="range-input-panel">
            <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="form-control form-control-sm"
                :placeholder="field.placeholder?field.placeholder.start:''"
            />
            <svg
                class="w-4 h-4 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="form-control form-control-sm"
                :placeholder="field.placeholder?field.placeholder.end:''"
            />
          </div>
        </template>
      </v-date-picker>

    </div>
    <div class=" text-center mb-2" :class="buttonClass">
      <button type="button" class="btn btn-sm btn-theme mb-2 me-2 mb-sm-0" :disabled="getStatus" @click="searchData" v-translate>Search</button>
      <button type="button" class="btn btn-sm btn-warning mb-2 mb-sm-0" :disabled="getStatus" @click="clearSearchData" v-translate>Reset</button>
    </div>
  </div>
  <div class="row g-2" v-if="isSingle">
    <div class="col-sm-8">
      <input type="text" ref="single_text_box" :placeholder="this.$translateGettext('Search')" @input="singleChange" @keyup="singleKeyUp($event)" v-model="singleValue" class="form-control form-control-sm">
    </div>
    <div class="col-sm-4">
      <button type="button" class="btn btn-sm btn-theme mb-2 me-2 mb-sm-0"  @click="singleSearch" :disabled="singleValue.length<=0" v-translate>Search</button>
      <button type="button" class="btn btn-sm btn-warning mb-2 mb-sm-0" @click="clearSearchData" v-translate :disabled="singleValue.length<=0">Reset</button>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { Calendar, DatePicker } from 'v-calendar';
export default {
  name: "ApbdFilterPanel",
  props:{
    isAdvance:{
      type:Boolean,
      default:false
    },
    advanceClass:{
      type:String,
      default:'col-sm-6 col-lg-3'
    },
    buttonClass:{
      type:String,
      default:'col-sm-3 col-lg-2'
    },
    isSingle:{
      type:Boolean,
      default:false
    },
    isAllowed:{
      type:Boolean,
      default:false
    },
    filterOptions:{
      type:Array,
      default:[]
    },
  },
  mounted() {

  },
  components:{
    Multiselect,Calendar,DatePicker
  },
  data(){
    return{
      selectedProp:'',
      singleValue:'',
      filterProps:[],
    }
  },
  emits:['searchFilter','reset'],
  computed:{
    has_props(){
      this.filterProps=this.filterOptions;
      return this.filterProps.length>0;
    },
    isSelected(){
      if (this.selectedProp!="")
      {
        return true;
      }else {
        return false;
      }
    },
    getStatus(){
      for (let i =0;i<this.filterProps.length;i++)
      {
        if (this.filterProps[i].value!='' && this.filterProps[i].value!=null && this.filterProps[i].value.start!='')
        {
          return false;
        }
      }
      return true;
    },
    getDisStatus(){
      if (this.selectedProp!='' && this.selectedProp!=undefined){
        if (this.selectedProp.value!='' && this.selectedProp.value!=undefined  && this.selectedProp.value.start!=0){
          return false;
        }else {
          return true;
        }
      }else {
        return true;
      }
    }
  },
  methods:{
    changingProp()
    {
      let data = {...this.selectedProp}
      if (data)
      {
        for(let i=0;i<this.filterProps.length;i++)
        {
          if (this.filterProps[i].id==data.id)
          {
            this.filterProps[i].value='';
            break;
          }
        }
      }
    },
    searchData(){
      const data= {
        propName:'',
        operators:'',
        value:''
      }
      let dataArray=[];
      if (this.isAdvance)
      {
        for (let i=0;i<this.filterProps.length;i++)
        {
          if (this.filterProps[i].value!='' && this.filterProps[i].value!=undefined)
          {
            data.propName=this.filterProps[i].propName;
            data.operators=this.filterProps[i].operators;
            data.value=this.filterProps[i].value;
            if (data.value!='' && data.value!=null && data.value!=undefined)
            {
              dataArray.push({...data});
            }

          }
        }
      }else {
        if (this.selectedProp!=null && this.selectedProp!='')
        {
          data.propName=this.selectedProp.propName;
          data.operators=this.selectedProp.operators;
          data.value=this.selectedProp.value;

          if (data.value!='' && data.value!=undefined)
          {
            dataArray.push(data);
          }
        }
      }
      if (dataArray.length>0)
      {
        this.$emit('searchFilter',dataArray);
      }

    },
    singleKeyUp(e){
      if (e.key === 'Enter' || e.keyCode === 13) {
        this.singleSearch();
      }
    },
    singleChange(){
      if(this.singleValue==''){
        this.clearSearchData();
      }
    },
    singleSearch(){
      const data= {
        propName:'*',
        operators:'like',
        value:this.singleValue
      }
      if(this.singleValue.length>0) {
        let dataArray = [data];
        this.$emit('searchFilter', dataArray);
      }
    },
    clearSearchData(){
      if(this.isSingle){
        this.singleValue='';
      }else {
        if (!this.isAdvance) {
          this.selectedProp.value = '';
          this.selectedProp = '';
        } else {
          for (let i = 0; i < this.filterProps.length; i++) {
            this.filterProps[i].value = '';
          }
        }
      }
      this.$emit('reset');
    },
    clearData(){
      for (let i=0;i<this.filterProps.length;i++)
      {
        if (this.filterProps[i].id==this.selectedProp.id)
        {
          this.filterProps[i].value='';
        }
      }
      this.selectedProp='';
      this.$emit('reset');
    },
    focusTextBox(){
      let thisObj=this;
      if (this.selectedProp.type=='t')
      {
        setTimeout(function() {
          try {
            thisObj.$refs.text_box.focus();
          } catch (e) {}
        },300);
      }else if(this.selectedProp.type=='tr')
      {
        setTimeout(function() {
          try {
            thisObj.$refs.input_range_box.focus();
          } catch (e) {}
        },300);
      }
    }
  },
}
</script>

<style scoped lang="scss">
.input-group{
  .input-group-text{
    min-width: 100px;
  }
  .multiselect{
    min-width:125px;
    width:100%;
    flex:1;
  }
  &.input-group-sm{
    .multiselect{
      min-height: auto;
    }
    &.date-range{
      align-items: center;
      flex-wrap: nowrap;
      .range-input-panel{
        display: flex;
        align-items: center;
        svg{
          height: 20px;
        }
      }
    }
  }
}


.prop-ctnr{
  flex:1;
  margin:0 5px;
}
</style>