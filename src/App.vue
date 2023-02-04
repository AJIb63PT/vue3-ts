<template>
  <div class="app">
    <settings v-if="settingsVisibility" @closeSettings="toggleSettingsVisibility()"></settings>
    <navbar @openSettings="toggleSettingsVisibility()"></navbar>
    <loader v-if="loading"></loader>
    <weather-list></weather-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Settings from "./components/Settings/Settings.vue";
import WeatherList from "./components/WeatherList.vue";
import Navbar from "./components/Navbar.vue";
import Loader from "./components/Loader.vue";
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'App',
  components: {
    Settings,
    WeatherList,
    Navbar,
    Loader,
  },
  data: () => ({
    settingsVisibility: false,

  }),
  mounted() {
    this.$store.commit("UPDATE_LOCATIONS");
    this.$store.dispatch("check");

  },

  computed: {
    ...mapGetters({
      loading: "GET_LOADING",
    }),
  },

  methods: {
    toggleSettingsVisibility() {
      this.settingsVisibility = !this.settingsVisibility;
    },

  },
});
</script>

<style lang="scss">
@import "./assets/styles/keyframes.scss";
@import "./assets/styles/variables.scss";

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: var(--background-color-app);
}

::-webkit-scrollbar {
  display: none;
}
</style>
