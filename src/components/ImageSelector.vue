<template>
  <div >
    <label class="form-label" v-translate>{{ title }}</label>
    <div class="d-flex justify-content-lg-start align-items-center mt-2 ">
      <div class="vt-img-picker apbd-img-selector me-3" :style="`width: ${containerWidth}px;`"  @click="selectImage">
        <img :style="`max-width: ${containerWidth}px; max-height: ${ctnrHeightRatio}px;  min-height: ${ctnrHeightRatio}px;`" v-if="modelValue" :src="modelValue" alt="logo">
        <span :style="`max-width: ${containerWidth}px;    max-height: ${ctnrHeightRatio}px;  min-height: ${ctnrHeightRatio}px;`"  v-if="modelValue"  @click="this.removeImage($event)" class="vt-remove-img-picker"><i class="vps vps-times-circle"></i></span>
        <span :style="`max-width: ${containerWidth}px;    max-height: ${ctnrHeightRatio}px;  min-height: ${ctnrHeightRatio}px;`" class="logo-icon" v-if="!modelValue"><i class="vps vps-vite-pos"></i></span>
      </div>
      <slot name="info"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "ImageSelector",
  emits:['onSelect'],
  props:{
    modelValue:'',
    title:{
      type:String,
      default:"File"
    } ,
    buttonText:{
      type:String,
      default:'Select',
    },
    containerWidth:{
      default:100,
    },
    containerHeight:{
      default:null,
    },

    imgWidth:{
      default:166,
    },
    imgHeight:{
      default:60,
    }
  },
  computed:{
    imgWidthRatio(){

    },
    ctnrHeightRatio(){
      if(this.containerHeight){
        return this.containerHeight;
      }
      return Math.round((this.imgHeight/this.imgWidth)*this.containerWidth);
    },
  },
  methods:{
    removeImage(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('update:modelValue', '');
    },
    selectImage() {
      const thisObj = this;
      //this.$appsbdUtls.WPFileChooser("")
      console.log("Clicked");
      this.$appsbdUtls.WPMediaImageCropped({
        width:this.imgWidth,
        height:this.imgHeight,
        title:this.title,
        button_text:"Select Logo",
        flex_width : true,
        callback:function (file) {
          thisObj.$emit('update:modelValue', file.url);
          console.log(file.url);
          thisObj.$emit('onSelect', file);
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.apbd-img-selector {
  border: 1px solid #ccc;

  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 24px -5px #ccc;
  background: rgba(255, 255, 255, 0.49);

  > img {
    /*max-width: 100px;
    max-height: 60px;
    min-height: 60px;*/
  }

  > span {
   /* min-width: 100px;
    min-height: 60px;
    max-width: 100px;*/
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      color: #ccc;
      font-size: 24px;
    }
  }
}
</style>