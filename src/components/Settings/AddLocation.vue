<template>
	<div>
		<p class="settings__content__title">Add Location</p>

		<form @submit.prevent="addLocation()" class="settings__content__new_location">
			<div class="settings__content__new_location__fields">
				<div>
					<svg :class="`settings__content__new_location__icon
						${new_location.city.text ? 'settings__content__new_location__icon__complete' : ''}
						${new_location.error ? 'settings__content__new_location__icon__error' : ''}
					`" viewBox="0 0 511.999 511.999">
						<path
							d="M409.124,63.426C368.224,22.525,313.843,0,256.001,0S143.777,22.525,102.877,63.426 c-40.901,40.902-63.426,95.282-63.426,153.123c0,117.012,110.638,214.337,170.077,266.623c8.26,7.266,15.393,13.541,21.076,18.849 c7.12,6.651,16.259,9.977,25.396,9.977c9.139,0,18.276-3.326,25.397-9.977c5.683-5.309,12.816-11.583,21.076-18.849 c59.439-52.287,170.077-149.611,170.077-266.623C472.549,158.708,450.025,104.328,409.124,63.426z M282.663,460.654 c-8.441,7.425-15.73,13.838-21.74,19.451c-2.761,2.577-7.085,2.578-9.847,0c-6.009-5.615-13.299-12.027-21.74-19.452 c-55.88-49.155-159.895-140.654-159.895-244.103c0-102.868,83.689-186.557,186.558-186.557 c102.868,0,186.557,83.689,186.557,186.557C442.557,319.999,338.543,411.498,282.663,460.654z" />
						<path
							d="M256.001,112.938c-52.621,0-95.431,42.809-95.431,95.43s42.81,95.43,95.431,95.43s95.43-42.809,95.43-95.43 S308.622,112.938,256.001,112.938z M256.001,273.805c-36.083,0-65.439-29.356-65.439-65.438s29.356-65.438,65.439-65.438 s65.438,29.356,65.438,65.438S292.084,273.805,256.001,273.805z" />
					</svg>

					<input :class="`settings__content__new_location__input
						${new_location.city.text ? 'settings__content__new_location__input__complete' : ''}
						${new_location.error ? 'settings__content__new_location__input__error' : ''}
					`" type="text" id="city_input" v-model="new_location.city.text" @keyup="onCityInput" @blur="onCityInput"
						:tabindex="2" autocorrect="off" spellcheck="false" placeholder="City" />
				</div>
			</div>

			<button class="settings__content__new_location__button" type="submit" :tabindex="3"
				:disabled="!isExistCity">
				+
			</button>
		</form>

		<p v-if="new_location.error" class="settings__content__error_message">{{ new_location.error }}</p>
	</div>
</template>

<script lang='ts'>
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
	data: () => ({
		new_location: {
			city: { text: "" },
			error: ''
		},
		isExistCity: false
	}),
	watch: {
		'new_location.city.text'(val) {
			this.fetchWeather(val)
		}
	},
	computed: {
		...mapGetters({
			locations: "GET_LOCATIONS",
		}),

		isAddAllowed() {
			if (this.new_location.city.text) {
				this.fetchWeather(this.new_location.city.text)
			}
			return !!this.new_location.city.text
		}
	},

	methods: {
		uniquenessValidation(locations: [], new_location: { city: string }) {
			return locations.filter((e: { city: string }) => e.city === new_location.city);
		},

		clearInputs() {
			this.new_location = {
				city: { text: "", },
				error: '',
			};
		},

		addLocation() {
			let city = this.new_location.city.text;
			let new_location = {
				id: new Date(),
				city: city,
				error: ''
			};

			if (this.uniquenessValidation(this.locations, new_location).length == 0) {
				let locations = this.locations;
				locations.push(new_location);

				this.$store.dispatch("setLocalStorageLocations", locations);
				this.$store.dispatch("fetchWeather", city);

				this.clearInputs();
			} else {
				this.new_location.error = "This location has already been added.";
			}
		},

		onCityInput(event: any) {
			this.new_location.error = '';

			if (event.ctrlKey || event.keyCode == 32) {
				return;
			}

		},

		async fetchWeather(city: string) {
			try {
				await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=65a065a167f4ea7978f769aa4eabcb6d`)
					.then((response) => {
						if (response.ok) {
							this.isExistCity = true;
						} else {
							this.isExistCity = false;
						}
						return response.json();
					})
					.then((data) => {
						return data;
					});
			} catch (error) {
				console.log(error);
			}
		},

	},
});
</script>

<style lang='scss'>
.settings__content__new_location {
	display: flex;

	&__fields {
		width: 100%;
		margin-right: 20px;

		>div {
			position: relative;
			display: flex;
			margin-top: 10px;
		}

		>div:first-child {
			margin-top: 0;
		}
	}

	&__icon {
		position: absolute;
		top: 10px;
		left: 10px;
		width: 20px;
		height: 20px;
		fill: var(--text-color);
		transition: 0.275s;

		&__complete {
			fill: #34a853;
		}

		&__error {
			fill: #db4437;
			animation: shakeIcon 0.5s ease-in-out;
		}
	}

	&__input {
		width: 100%;
		height: 40px;
		padding: 5px 10px;
		padding-left: 40px;
		color: var(--text-color);
		border-radius: 10px;
		font-size: 16px;
		transition: 0.275s;

		&:focus {
			border: 1px solid var(--background-color-accept);
		}
	}
}


.settings__content__new_location__input__complete,
.settings__content__new_location__input__complete:focus {
	border: 1px solid #34a853;
}

.settings__content__new_location__input__error,
.settings__content__new_location__input__error:focus {
	border: 1px solid #db4437;
	animation: shakeInput 0.5s ease-in-out;
}



.settings__content__new_location__button {
	width: 40px;
	border-radius: 10px;
	background: transparent;
	border: 1px solid var(--text-color);

	color: var(--text-color);
	font-size: 20px;

	cursor: pointer;
	transition: 0.275s;
}

.settings__content__new_location__button:disabled {
	border: 1px solid var(--accent-color);
	color: var(--accent-color);
	cursor: no-drop;
}

.settings__content__error_message {
	padding-top: 10px;
	color: #db4437;
	animation: fadeIn 0.275s ease-in-out;
}
</style>
