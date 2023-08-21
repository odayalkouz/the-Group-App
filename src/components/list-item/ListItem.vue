<template lang="pug">
.list-item
  p.list-item__title {{ city }}, {{ country }}
  .list-item__icon-remove(@click="handleCardRemoval(id)" title="Remove City")
    BinSvg

</template>

<script>
import BinSvg from "@/components/svg/bin";

export default {
  name: "ListItem",
  components: {
    BinSvg
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleCardRemoval() {
      this.$emit("deleteButtonClick", this.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./list-item.scss";
</style>
