<template>
  <div class="card info border-0 shadow rounded-3 my-5">
    <div class="card-header">
      <h5 v-translate>Pro version required</h5>
      <button type="button" class="btn-close" @click="this.$emit('onclose')"></button>
    </div>
    <div class="card-body ">
      <div class="row">
        <div class="col-md-6">
          <div class="msg-pnl">
            <h6 class="card-title">{{this.$gettext(msg)}}</h6>
            <ul class="p-0">
              <li><i class="vps vps-star me-2"></i> <translate>Can create and manage unlimited outlets</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Can create and manage unlimited counter for each outlet</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Split payment support in pro version</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Role wise discount manage</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Offline sale allowed in pro version</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Hold cart applicable in pro version</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Customization of color support in pro version</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Easy product manage (add,update,delete) based on role</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>Premium Support</translate></li>
              <li><i class="vps vps-star me-2"></i> <translate>And More..</translate></li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class=" ">
            <img class="img-fluid" :src="this.$appsbdUtls.getPOSAssetUrl('pos-skins/'+app_img+'.png')" alt="">
          </div>
          <div class="d-flex justify-content-center">
            <AppSkinColorPicker @change="change_image" :colors="colors" v-model="app_img" />
          </div>
        </div>
        <div class="mt-2 text-center">
          <a href="https://vitepos.com/getpro" target="_blank" class="btn btn-theme text-center" v-translate>Go pro</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AppSkinColorPicker from "@/components/AppSkinColorPicker";
let intervalId=null;
export default {
  name: "AlertInfo",
  components: {AppSkinColorPicker},
  props:{
    msg:{
      type:String,
      default:'Pro Version Required for this feature'
    }
  },
  data()
  {
    return{
      app_img:"default",
      is_clicked:false,
      colors: [
        {name: "default", title: "Default", color: "#2563EB"},
        {name: "cyan", title: "Gray", color: "#00ACC1"},
        {name: "green", title: "Green", color: "#4CAF50"},
        {name: "purple", title: "purple", color: "#7B1FA2"},
        {name: "pink", title: "pink", color: "#F06292"},
        {name: "red", title: "Red", color: "#b63431"},
        {name: "orange", title: "orange", color: "#F57C00"},
        {name: "gray", title: "Gray", color: "#757575"},
        {name: "black", title: "Dark", color: "#000000"},
      ]
    }
  },
  mounted() {
    this.change_color();
  },
  unmounted() {
    this.clearTimer();
  },
  methods:{
    change_image(val){
      this.app_img=val;
      this.is_clicked=true;
    },
    clearTimer(){
      try {
        clearInterval(intervalId);
      }catch (e) { }
    },
    change_color(){
      var delay = 2000;
      let i = 0;
      let thisObj=this;
      intervalId = setInterval(function() {
        const A = thisObj.colors[i];
        if (!thisObj.is_clicked)
        {
          thisObj.app_img=A.name;
        }
        if (thisObj.colors.length == i+1)
        {
          i=0;
        }else {
          i++;
        }
        if (thisObj.is_clicked)
        {
          this.clearTimer();
        }
      }, delay);
    }
  }
}
</script>

<style scoped>

</style>
