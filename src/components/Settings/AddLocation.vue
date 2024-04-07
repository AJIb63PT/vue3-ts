<template>
    <div>
        <p class="settings__content__title">Add Location</p>

        <form @submit.prevent="addLocation()" class="flex">
            <div class="w-full mr-5">
                <div class='relative flex mt-2.5 first:mt-0'>
                    <svg :class="svgClass" viewBox="0 0 511.999 511.999">
                        <path
                            d="M409.124,63.426C368.224,22.525,313.843,0,256.001,0S143.777,22.525,102.877,63.426 c-40.901,40.902-63.426,95.282-63.426,153.123c0,117.012,110.638,214.337,170.077,266.623c8.26,7.266,15.393,13.541,21.076,18.849 c7.12,6.651,16.259,9.977,25.396,9.977c9.139,0,18.276-3.326,25.397-9.977c5.683-5.309,12.816-11.583,21.076-18.849 c59.439-52.287,170.077-149.611,170.077-266.623C472.549,158.708,450.025,104.328,409.124,63.426z M282.663,460.654 c-8.441,7.425-15.73,13.838-21.74,19.451c-2.761,2.577-7.085,2.578-9.847,0c-6.009-5.615-13.299-12.027-21.74-19.452 c-55.88-49.155-159.895-140.654-159.895-244.103c0-102.868,83.689-186.557,186.558-186.557 c102.868,0,186.557,83.689,186.557,186.557C442.557,319.999,338.543,411.498,282.663,460.654z" />
                        <path
                            d="M256.001,112.938c-52.621,0-95.431,42.809-95.431,95.43s42.81,95.43,95.431,95.43s95.43-42.809,95.43-95.43 S308.622,112.938,256.001,112.938z M256.001,273.805c-36.083,0-65.439-29.356-65.439-65.438s29.356-65.438,65.439-65.438 s65.438,29.356,65.438,65.438S292.084,273.805,256.001,273.805z" />
                    </svg>

                    <input :class="inputClass" type="text" id="city_input" v-model="new_location.city.text"
                        @keyup="onCityInput" @blur="onCityInput" :tabindex="2" autocorrect="off" spellcheck="false"
                        placeholder="City" />
                </div>
            </div>

            <button
                class="w-10 border border-text text-text text-xl cursor-pointer transition-[0.275s] rounded-[10px] border-solid disabled:border disabled:border-accent disabled:text-accent disabled:cursor-no-drop disabled:border-solid"
                type="submit" :tabindex="3" :disabled="!isExistCity">
                +
            </button>
        </form>

        <p v-if="new_location.error" class="text-[#db4437] animate-[fadeIn_0.275s_ease-in-out] pt-2.5">
            {{ new_location.error }}
        </p>
    </div>
</template>

<script lang="ts">
import { ref, watch, reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        type locationType = { city: cityType, error: string }
        type cityType = { text: string }

        let new_location: locationType = reactive({
            city: { text: '' },
            error: '',
        });
        let isExistCity = ref(false);
        async function fetchWeather(city: string) {
            try {
                await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=65a065a167f4ea7978f769aa4eabcb6d`)
                    .then((response) => {
                        if (response.ok) {
                            isExistCity.value = true;
                        } else {
                            isExistCity.value = false;
                        }
                        return response.json();
                    })
                    .then((data) => {
                        return data;
                    });
            } catch (error) {
                console.error(error);
            }
        }

        function uniquenessValidation(locations: [], new_location: { city: string }) {
            return locations.filter((e: { city: string }) => e.city === new_location.city);
        }

        const clearInputs = () => {
            new_location = {
                city: { text: '' },
                error: '',
            };
        }

        const isAddAllowed = computed(() => {
            if (new_location.city.text) {
                fetchWeather(new_location.city.text);
            }
            return !!new_location.city.text;
        })
        const svgClass = computed(() => {
            return `absolute w-5 h-5 fill-text transition-[0.275s] left-2.5 top-2.5
                ${new_location.city.text ? ' fill-[#34a853]' : ''}
                ${new_location.error ? ' fill-[#db4437] animate-[shakeIcon_0.5s_ease-in-out]' : ''}`
        })

        const inputClass = computed(() => {
            return ` w-full h-10 text-text text-base transition-[0.275s] pl-10 px-2.5 py-[5px] rounded-[10px] focus:border focus:border-background-accept focus:border-solid
                    ${new_location.city.text ? ' border border-solid border-[#34a853]' : ''}
                    ${new_location.error ? ' border animate-[shakeInput_0.5s_ease-in-out] border-solid border-[#db4437]' : ''}`
        })
        const locations: any = computed(() => store.getters['GET_LOCATIONS']);
        watch(new_location, (nval, val) => {
            fetchWeather(val.city.text);
        });

        const addLocation = () => {
            let city: string = new_location.city.text;
            let local_new_location: any = {
                id: new Date(),
                city: city,
                error: '',
            };

            if (uniquenessValidation(locations.value, local_new_location).length == 0) {

                let newLocations: locationType[] = locations.value;
                newLocations.push(local_new_location);

                store.dispatch('setLocalStorageLocations', newLocations);
                store.dispatch('fetchWeather', city);
                clearInputs();

            } else {
                new_location.error = 'This location has already been added.';
            }
        };

        function onCityInput(event: any) {
            new_location.error = '';

            if (event.ctrlKey || event.keyCode == 32) {
                return;
            }
        };
        return {
            isAddAllowed,
            new_location,
            locations,
            fetchWeather,
            addLocation,
            onCityInput,
            isExistCity,
            svgClass,
            inputClass
        }
    },
};
</script>
