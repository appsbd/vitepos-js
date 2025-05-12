<template>
</template>

<script>
// @ is an alias to /src

import {mapGetters} from 'vuex';
import useBreakpoint from "../libraries/Responsive";
import Rolling from "../components/Rolling";
export default {
  name: 'Dashboard',
  emits:['click'],
  components: {
    Rolling,
  },
  data(){
    return {
      msg: 'Processing',
      searchInput:'',
      val:'',
      timer:null,
      scanData:'',
      isLoading:false,
      isLoadingScan:false,
      isSuccess:false,
      successMsg:'',
      scanedProduct:'',
      app_product:{
        data:null,
        page:1,
        total:1,
        records:0,
        limit:50,
        rowdata:[]
      },
      filterProp:{
        searchKey:'',
        sort_prop: '',
        sort_ord: '',
      },
      showCart:false,
      showScanner:false,
      hasError:false,
      emptyResult:false,
      mobileScanning:false,
      text:'',
      id: null,
      timer_obj: null,
    };
  },
  mounted() {
    if (this.$route.params.showCart)
    {
      this.showHome(true);
    }
  },
  computed:{
    ...mapGetters({
    }),
  },
  methods:{
    hideMenu(e)
    {
      e.preventDefault();
      e.stopPropagation();
      this.$store.state.hideMenuBar = !this.$store.state.hideMenuBar;
    }
  },
  setup(){
    const {ScreenWidth,ScreenType,isUptoTab}=useBreakpoint();

    return {
      isUptoTab,
      ScreenWidth,
      ScreenType
    }
  }
}
</script>

<style lang="scss" scoped>
[dir='rtl'] {
  .footer-button{
    .vps-angle-double-left{
      transform: rotate(0deg);
    }
  }
}

</style>
