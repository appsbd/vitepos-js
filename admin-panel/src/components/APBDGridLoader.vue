<template>
  <div class="loader-content">
    <app-loader :msg="msg" />
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader";
export default {
name: "APBDGridLoader",
  components: {AppLoader},
  props:{
  msg:{
    type:String,
    default:'Loading ...'
  }
  }
}
</script>

<style scoped lang="scss">

svg{

  circle:nth-child(2){
    stroke: var( --apbd-theme-color,#2563eb) ;
  }
}
</style>