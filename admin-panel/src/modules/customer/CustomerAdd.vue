<template>
  <div>
    <input type="text">
  </div>
</template>

<script>

export default {
  name: "CustomerAdd",
  props:{
    moduleId:{
      type:String,
      default:'non-id'
    },
    closeModal:{
      type:Function,
      default:function(){}
    },
    isModalEdit: {
      type:Boolean,
      default:false
    },
    editParams: {
      default: null
    }
  }
}
</script>

<style scoped>

</style>