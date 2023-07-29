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
