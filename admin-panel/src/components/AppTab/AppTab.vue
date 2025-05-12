<template>
  <div v-if="isActive"><slot></slot></div>
</template>

<script>
export default {
  name: "AppTab",
  props: {
    title: { required: true },
    selected: { default: false},
    icon: { default: ''}

  },

  data() {

    return {
      name:"tab-1",
      isActive: false
    };

  },

  computed: {

    href() {
      return '#' + this.name;
    }
  },

  mounted() {

    this.isActive = this.selected;

  },

  created() {
    try {
      this.name="tab"+(this.$parent.tabs.length+1);
      this.$parent.tabs.push(this);
    }catch (e) {
      console.log(e.message);
    }

  },
}
</script>

<style scoped>

</style>