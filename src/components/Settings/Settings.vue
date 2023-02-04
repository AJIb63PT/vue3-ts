<template>
	<div class="settings">
		<div class="settings__mask" @click="closeSettings()"></div>

		<div class="settings__content">
			<h1>Settings</h1>
			<svg class="settings__content__close_button" @click="closeSettings()" viewBox="0 0 311 311.07733">
				<path
					d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
				<path
					d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
			</svg>

			<LocationsList></LocationsList>
			<AddLocation></AddLocation>
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
			document.querySelectorAll<HTMLElement>(".settings__content")[0].style.animation = "fadeOut_slideDown 0.275s ease-in-out";
			document.querySelectorAll<HTMLElement>(".settings__mask")[0].style.animation = "fadeOut 0.275s ease-in-out";
			setTimeout(() => {
				this.$emit("closeSettings");
			}, 275);
		},
	},
});
</script>

<style lang='scss'>
.settings {
	position: fixed;
	z-index: 100;

	&__mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--background-color-app);
		animation: fadeIn 0.275s ease-in-out;
	}

	&__content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 460px;
		max-height: 80%;
		background: var(--background-color-settings);
		border: 1px solid var(--accent-color);
		transition: 0.275s;
		border-radius: 20px;
		padding: 20px;
		overflow-y: scroll;
		overflow-x: hidden;
		animation: fadeIn_slideUp 0.275s ease-in-out;

		&__title {
			font-size: 21px;
			font-weight: 600;
			padding-top: 20px;
			padding-bottom: 5px;
		}

		&__close_button {
			position: absolute;
			top: calc(20px + 12.4px);
			right: 20px;
			width: 20px;
			height: 20px;
			fill: var(--text-color);
			cursor: pointer;
			transition: 0.275s;

			&:hover {
				transform: rotate(90deg);
			}
		}
	}
}

@media screen and (max-width: 500px) {
	.settings__content {
		width: calc(100% - 40px);
	}
}
</style>
