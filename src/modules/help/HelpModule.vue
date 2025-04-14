<template>
  <app-tabs class="test-tab">
    <app-tab :title="this.$gettext('Basic Help')" icon="vps vps-help-circle">
      <basic/>
    </app-tab>
    <app-tab :title="this.$gettext('About VitePos')" icon="vps vps-vite-pos">
      <about-vitepos/>
    </app-tab>
    <app-tab :title="this.$gettext('Contact Author')"  icon="vps vps-vite-pos" >
      <p v-translate>In case of any problem, get in touch with the Vitepos team. We always support our clients until their satisfaction comes. And that is our responsibility and duty.</p>
      <a class="btn btn-sm btn-primary" target="_blank" href="https://vitepos.com/contact-us/" v-translate>Contact Support Team</a>
    </app-tab>
  </app-tabs>
</template>

<script>
import AppTabs from "@/components/AppTab/AppTabs";
import AppTab from "@/components/AppTab/AppTab";
import Basic from "@/modules/help/basic";
import AboutVitepos from "@/modules/help/AboutVitepos";
export default {
  name: "HelpModule",
  components: {AboutVitepos, Basic, AppTab, AppTabs}
}
</script>

<style scoped>

</style>