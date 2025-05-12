<template>
    <div class="card apbd-theme-card">
      <div class="apbd-tab-btns card-header">
        <ul class="nav apbd-tab-nav w-100">
          <li class="nav-item" v-for="tab in tabs" :class="{'apbd-tab-active': tab.isActive}">
            <a :href="tab.href" :class="tabClass+' '+(tab.isActive?'apbd-active':'')" @click="selectTab($event,tab)">
              <i v-if="tab.icon" class="me-1" :class="tab.icon"></i>
              <translate>{{ tab.title }}</translate></a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="apbd-tabs-details">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AppTabs",
  props:{
    tabClass:{
      type:String,
      default:"apbd-tab-btn btn"
    }
  },
  data() {
    return {
      tabs: []
    };
  },
  created() {

  },
  mounted() {
   this.selectInitialTab();
  },
  methods: {
    selectInitialTab(){
      let firstTab=null;
      let isSelected=false;
      this.tabs.forEach(tab => {
        if(!firstTab){
          firstTab=tab;
        }
        if( tab.isActive){
          isSelected=true;
        }
      });
      if(firstTab && !isSelected){
        firstTab.isActive=true;
      }
    },
    selectTab(e,selectedTab) {
      e.preventDefault();
      e.stopPropagation();
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    }
  }
}
</script>

<style scoped>

</style>