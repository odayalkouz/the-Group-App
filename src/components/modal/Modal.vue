<template lang="pug">
.modal(:class="getClass")
  .modal__overlay(@click="handleClose")
  .modal__wrapper
    .modal__header
      h3.modal__title Weather Settings
      CloseButton.modal__close(@click="handleClose")
    .modal__content
      SearchBar(@handleSearch="handleSearch")
      List
      OkButton.modal__close(@click="handleClose")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CloseButton from "@/components/close-button/CloseButton";
import OkButton from "@/components/ok-button/OkButton";
import SearchBar from "@/components/search-bar/SearchBar";
import List from "@/components/list/List";

export default {
  components: {
    OkButton,
    CloseButton,
    SearchBar,
    List,
  },

  data() {
    return {
      inProgress: false,
    };
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      searchValue: "GET_SEARCH_VALUE",
      isDuplicate: "GET_IS_DUPLICATE",
    }),
    getClass() {
      return {
        modal_open: this.isVisible,
        modal_closed: !this.isVisible && this.inProgress,
      };
    },
  },

  watch: {
    isVisible(value) {
      if (!value) {
        document.body.focus();
      }
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeyDown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    ...mapActions(["handleSearchCity"]),

    
    handleSearch(searchValue) {
      this.$store.dispatch("handleSearchCity", searchValue);
      this.handleClose();
    },

    handleClose() {
      this.inProgress = true;
      this.$emit("closeModal");
      setTimeout(() => {
        this.inProgress = false;
      }, 300);
    },

    handleKeyDown(event) {
      if (this.isVisible && event.keyCode === 27) {
        this.handleClose();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./modal.scss";
</style>
