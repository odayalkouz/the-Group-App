<template lang="pug">
button.ok-button(@click="$emit('click')") OK
</template>

<script>
export default {
  name: "OkButton",
  emits: ["click"],
};
</script>

<style lang="scss" scoped>
@import "./ok-button.scss";
</style>
