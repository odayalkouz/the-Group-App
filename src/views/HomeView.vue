<template lang="pug">
.home
  Header.home__header(@openModal="toggleModal")
  Modal(:isVisible="isModalVisible" @closeModal="toggleModal")
  Spinner(v-if="isLoading")
  Dashboard(v-else)
  div.app-copywrite All rights reserved © Financial Group

</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_SELECTED_LOCATIONS } from "@/store/mutation-types";

import Header from "@/components/header/Header.vue";
import Modal from "@/components/modal/Modal.vue";

import Dashboard from "@/components/dashboard/Dashboard.vue";
import Spinner from "@/components/spinner/Spinner.vue";
import Footer from "@/components/header/Header.vue";


export default {
  name: "HomeView",
  components: {
    Header,
    Modal,
    Dashboard,
    Spinner,
    Footer
  },

  data() {
    return {
      isModalVisible: false
    };
  },
  created(){
    setTimeout(() => {
      this.toggleModal()
    }, 1800);
  },

  computed: {
    ...mapGetters({
      isLoading: "GET_IS_LOADING",
    })
  },

  mounted() {
    this.$store.commit(UPDATE_SELECTED_LOCATIONS);
    this.$store.dispatch("checkLocationsData");
  },

  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
  }
};
</script>

<style scoped lang="scss">
@import "../sass/pages/home.scss";
</style>
