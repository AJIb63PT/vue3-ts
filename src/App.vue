<template>
    <div id="app">
        <settings v-if="settingsVisibility" @closeSettings="toggleSettingsVisibility()"></settings>
        <navbar @openSettings="toggleSettingsVisibility()"></navbar>
        <loader v-if="loading"></loader>
        <weather-list></weather-list>
    </div>
</template>

<script lang="ts">
import Settings from "./components/Settings/Settings.vue";
import WeatherList from "./components/WeatherList.vue";
import Navbar from "./components/Navbar.vue";
import Loader from "./components/Loader.vue";
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
    components: {
        Settings,
        WeatherList,
        Navbar,
        Loader,
    },
    setup() {
        const store = useStore()
        const settingsVisibility = ref(false)
        onMounted(() => {
            store.commit("UPDATE_LOCATIONS");
            store.dispatch("check");
        })
        function toggleSettingsVisibility() {
            settingsVisibility.value = !settingsVisibility.value;
        }
        return {
            settingsVisibility,
            loading: computed(() => store.getters['GET_LOADING']),
            toggleSettingsVisibility
        }
    },
}
</script>
