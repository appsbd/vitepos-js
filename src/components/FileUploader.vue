<template>
  <input ref="afu-input"  class="afu-input" v-bind="$attrs"   type="file"  @change="fileSelected($event)" >
  <div class="afu-cont" @click="browseFile($event)">
    <slot >Upload</slot>
  </div>

</template>

<script>
export default {
  name: "FileUploader",
  inheritAttrs: false,
  emits:['onSelectFiles'],
  data(){
    return{
      selectedFiles:[]
    }
  },
  methods:{
    browseFile(e){
      this.$refs['afu-input'].click();
    },
    fileSelected(e,id){
      this.selectedFiles=[];
      var mainSelected=this.selectedFiles;
      this.$emit("onSelectFiles",e.target.files);
    },
    variantImage(e,id){
      this.$emit("onSelectFiles",e.target.files);
    }
  }
}
</script>

<style lang="scss" scoped>
.afu-input{
  display: none;
}
.afu-cont{
  display: inline-block;
}
</style>