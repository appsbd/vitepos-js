<template>
  <div class="ad-local-loader" v-if="isShowLoader">
    <app-loader :msg="loaderMsg" />
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader";
export default {
name: "Loader",
  components: {AppLoader},
  props:{
    isShowLoader:{
      type:Boolean,
      default:false
    },
    loaderMsg:{
      type:String,
      default: "Loading..."
    }
  }
}
</script>

<style scoped>

</style>