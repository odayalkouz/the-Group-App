<template lang="pug">
.header(data-header)
  .header__content
    div(title="Weather Setting")
      SettingsIcon.header__content-icon(@click="openModal")
    ThemeSwitcher
    h2.header__content-title Weather Application
    Time
</template>

<script>
import SettingsIcon from "@/components/svg/settings";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher.vue";
import Time from "@/components/time/Time.vue";
export default {
  name: "Header",

  components: {
    SettingsIcon,
    ThemeSwitcher,
    Time
  },
  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./header.scss";
</style>
