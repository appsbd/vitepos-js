<template>
  <div class="loader-ctnr">
  <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px"
       viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <defs>
      <filter v-if="!noDropShadow" id="AppLogoDropshadow"  x="-50" y="-50" width="100" height="100" >
        <feDropShadow dx="0" dy="0" stdDeviation="2" flood-opacity="0.5"/>
      </filter>
    </defs>
    <circle class="circle-1" :filter="filterDropshadow" cx="50" cy="50" r="32" stroke-width="8" stroke="#fff" stroke-dasharray="50.26548245743669 50.26548245743669"
            fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" dur="1.33s" repeatCount="indefinite"
                        keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
    </circle>
    <circle class="circle-2"  cx="50" cy="50" r="23" stroke-width="8" stroke-dasharray="36.12831551628262 36.12831551628262"
            stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" dur="1.33s" repeatCount="indefinite"
                        keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
    </circle>

   <text :filter="filterDropshadow" class="vps" x="40" y="58">&#xe900;

   </text>
  </svg>
  <span>{{ this.$translateGettext(msg) }}</span>
  </div>
</template>

<script>
export default {
  name: "AppLoader",
  props: {
    msg: {
      type: String,
      default: 'Loading ...'
    },
    noDropShadow: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    filterDropshadow(){
      return this.noDropShadow?'':'url(#AppLogoDropshadow)';
    }
  }
}
</script>

<style scoped lang="scss">
.loader-ctnr{
  text-align: center;
  padding-bottom: 2rem;
  font-size: 14px;
  font-weight: normal;
}
svg {
  height:100px;
  perspective: 1rem;
  .vps{
    color:#fff;
  }
  circle.circle-1 {
    stroke: #fff;
  }
  circle.circle-2 {
    stroke: var(--apbd-theme-color, #2563eb);
  }
  text{
    backface-visibility: hidden;
    perspective: 1rem;
    will-change: transform;
    color: #ffffff;
    fill: currentColor;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.31);
    transform-origin: 50% 50%;
  }
}
</style>