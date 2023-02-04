import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
export interface State {
  locations: { id: number; city: string }[];
  weather: { id: number; city: string }[];
  loading: false;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    locations: [],
    weather: [],
    loading: false,
  },
  getters: {
    GET_LOCATIONS(state) {
      return state.locations;
    },

    GET_WEATHER(state) {
      return state.weather;
    },

    GET_LOADING(state) {
      return state.loading;
    },
  },
  mutations: {
    UPDATE_LOCATIONS(state) {
      let locations = JSON.parse(localStorage.getItem('locations')!);
      locations !== null
        ? (state.locations = locations)
        : (state.locations = []);
    },

    ADD_WEATHER(state, data) {
      state.weather.push(data);
    },

    REMOVE_WEATHER(state, index) {
      state.weather.splice(index, 1);
    },

    SWAP_WEATHER(state, indexes) {
      let { startIndex, endIndex } = indexes;

      let temp = state.weather[startIndex];
      state.weather[startIndex] = state.weather[endIndex];
      state.weather[endIndex] = temp;
    },

    SET_LOADING(state, value) {
      state.loading = value;
    },
  },
  actions: {
    setLocalStorageLocations({ commit }, locations) {
      localStorage.setItem('locations', JSON.stringify(locations));
      commit('UPDATE_LOCATIONS');
    },

    async check({ state, commit, dispatch }) {
      if (!state.locations[0]) {
        commit('SET_LOADING', true);

        await dispatch('fetchUserLocation').then((user_location) => {
          let locations = [
            {
              id: new Date(),
              city: user_location.city,
            },
          ];
          dispatch('setLocalStorageLocations', locations);

          commit('SET_LOADING', false);
        });
      }

      dispatch('loadData');
    },

    async fetchUserLocation() {
      try {
        return await fetch('https://ipinfo.io/json?token=c84bdcfb3bc7d8')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      } catch (error) {
        console.log(error);
      }
    },

    async loadData({ state, commit, dispatch }) {
      commit('SET_LOADING', true);

      for (let i = 0; i < state.locations.length; i++) {
        await dispatch('fetchWeather', state.locations[i].city);
      }

      commit('SET_LOADING', false);
    },

    async fetchWeather({ commit }, city) {
      try {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=65a065a167f4ea7978f769aa4eabcb6d`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            commit('ADD_WEATHER', data);

            return data;
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
// export function useStore() {
//   return baseUseStore(key);
// }
