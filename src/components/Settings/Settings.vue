<template>
	<div class="fixed z-[100]">
		<div id='settings__mask'
			class="fixed w-full h-full bg-background-app animate-[fadeIn_0.275s_ease-in-out] left-0 top-0"
			@click="closeSettings()"></div>
		<div id='settings__content'
			class="fixed -translate-x-2/4 -translate-y-2/4 w-[460px] max-h-[80%] border border-accent transition-[0.275s] overflow-y-scroll overflow-x-hidden animate-[fadeIn\_slideUp_0.275s_ease-in-out] p-5 rounded-[20px] border-solid left-2/4 top-2/4 md:w-[calc(100%_-_40px)]">
			<h1 class="text-[21px] text-text font-semibold pt-5 pb-[5px]">Settings</h1>
			<svg class="absolute w-5 h-5 fill-text cursor-pointer transition-[0.275s] right-5 top-[calc(20px_+_12.4px)] hover: rotate-90"
				@click="closeSettings()" viewBox="0 0 311 311.07733">
				<path
					d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
				<path
					d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
			</svg>
			<LocationsList />
			<AddLocation />
		</div>
	</div>
</template>

<script lang='ts'>
import AddLocation from "./AddLocation.vue";
import LocationsList from "./LocationsList.vue";
import { defineComponent } from 'vue'

export default defineComponent({
	components: {
		AddLocation,
		LocationsList,
	},

	methods: {
		closeSettings() {
			document.querySelectorAll<HTMLElement>("#settings__content")[0].style.animation = "fadeOut_slideDown 0.275s ease-in-out";
			document.querySelectorAll<HTMLElement>("#settings__mask")[0].style.animation = "fadeOut 0.275s ease-in-out";
			setTimeout(() => {
				this.$emit("closeSettings");
			}, 275);
		},
	},
});
</script>
