<template>
  <div class="d-flex ">
    <span class="vtp-circle-logo me-3">
      <i class="vps vps-vite-pos"></i>
    </span>
    <div>
      <h1 class="mb-1"><i class="vps vps-vt-pos"></i></h1>
      <strong><translate>Version</translate> : {{ versionText }}</strong>
      <span class="ms-3"> <translate>Build :</translate> {{buildId}}</span>
      <p><translate>for more details please visit</translate> <a target="_blank" href="https://vitepos.com/">vitepos.com</a>
        <br><small>Vitepos, Copyright © {{ current_year }}  <a target="_blank" href="https://appsbd.com">Appsbd</a>. All rights reserved.</small>
      </p>
    </div>
  </div>

  <p>

    <br>



  </p>

</template>

<script>
export default {
  name: "AboutVitepos",
  computed: {
    versionText: function () {
      return process.env.VUE_APP_VERSION;
    },
    buildId: function () {
      return process.env.VUE_APP_BUILD_ID;
    },
    current_year:function (){
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>

</style>