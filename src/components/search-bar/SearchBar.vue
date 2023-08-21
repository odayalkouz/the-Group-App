<template lang="pug">
.search-bar 
  h4.search-bar__title Select City:
  .search-bar__input-wrapper(style="display:none")
    input.search-bar__input(
      type="text"
      placeholder="Search City..."
      v-model.trim="searchValue"
      @keydown.enter="handleSearch"
      )
    span.search-bar__input-focus-border
    SearchIcon.search-bar__input-icon(@click="handleSearch")
  .select-bar__input-wrapper
      select.select-bar__input(@change="handleSearch" v-model='searchValue' value="selected")
        option(v-for='item in Countres' :value='item.name' :key='item.id')
          | {{ item.name }}
</template>

<script>
import SearchIcon from "@/components/svg/search";
import { mapGetters } from "vuex";

export default {
  name: "Search",

  components: { SearchIcon },

  data() {
    return {
      searchValue: "AMMAN",
      Countres: this.$store.state.Countres
    };
  },

  computed: {
    ...mapGetters({
      isDuplicate: "GET_IS_DUPLICATE",
      isError: "GET_IS_ERROR",
    }),
    getNotificationMessage() {
      if (this.isDuplicate) {
        return "This city has already been added to the Dashboard.";
      }
      if (this.isError) {
        return "No city found. Please check the spelling.";
      }
    },
  },

  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.searchValue);
      //this.searchValue = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "./search-bar.scss";
</style>
