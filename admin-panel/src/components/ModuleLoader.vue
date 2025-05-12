<template>
  <div class="module-loader">
    <div class="loader-content">
      <app-loader :msg="msg" />
    </div>
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader";
export default {
name: "ModuleLoader",
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