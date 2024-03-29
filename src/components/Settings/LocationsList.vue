<template>
	<div>
		<p class='text-text mb-4'>Your Locations</p>
		<div class="flex flex-col gap-2.5" @dragover.prevent>
			<div v-for="item in locations" :key="item.id" id='location-item'
				class="flex items-center w-full h-10 leading-6 bg-background-shield transition-[0.275s] p-2 rounded-[10px]"
				draggable="true" @dragstart="onDragStart($event, item)" @dragenter="onDragEnter($event)"
				@dragleave="onDragLeave($event)" @drop="onDrop($event, item)">
				<div class="min-w-[24px] max-w-[24px] h-6 cursor-move mr-[5px] mt-[7px]">
					<svg viewBox='0 0 24 24' class="fill-text pointer-events-none transition-[0.275s]">
						<path
							d="M14.5 15.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 15.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 15.5zm5-5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 10.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 10.5zm5-5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 5.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 5.5z">
						</path>
					</svg>
				</div>

				<div class="w-full flex items-center pointer-events-none">
					<p>{{ item.city }}</p>

				</div>

				<div class="relative min-w-[24px] h-6 cursor-pointer p-[11px" @click="removeLocation(item)">
					<svg class="absolute w-[18px] pointer-events-none transition-[0.275s]" viewBox="0 0 407.521 407.521">
						<path
							d="M335.94,114.944H71.581c-2.86-0.243-5.694,0.702-7.837,2.612c-2.107,2.024-3.083,4.954-2.612,7.837l27.167,236.669 c3.186,26.093,25.436,45.647,51.722,45.453h131.657c27.026,0.385,49.791-20.104,52.245-47.02l22.465-236.147 c0.139-2.533-0.811-5.005-2.612-6.792C341.634,115.646,338.8,114.701,335.94,114.944z M303.026,359.45 c-1.642,15.909-15.366,27.803-31.347,27.167H140.022c-15.694,0.637-29.184-11.024-30.825-26.645L83.075,135.842h241.371 L303.026,359.45z" />
						<path
							d="M374.079,47.026H266.454V30.307c0.58-16.148-12.04-29.708-28.188-30.288c-0.53-0.019-1.061-0.024-1.591-0.014h-65.829 c-16.156-0.299-29.494,12.555-29.793,28.711c-0.01,0.53-0.005,1.061,0.014,1.591v16.718H33.442 c-5.771,0-10.449,4.678-10.449,10.449s4.678,10.449,10.449,10.449h340.637c5.771,0,10.449-4.678,10.449-10.449 S379.849,47.026,374.079,47.026z M245.556,30.307v16.718h-83.592V30.307c-0.589-4.579,2.646-8.768,7.225-9.357 c0.549-0.071,1.104-0.086,1.656-0.047h65.829c4.605-0.326,8.603,3.142,8.929,7.748C245.643,29.203,245.627,29.758,245.556,30.307 z" />
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang='ts'>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {

	setup() {
		const store = useStore()
		const locations: any = computed(() => store.getters['GET_LOCATIONS']);

		const onDragStart = (event: any, item: { id: number, city: string }) => {
			event.dataTransfer.dropEffect = "move";
			event.dataTransfer.effectAllowed = "move";

			let startIndex = locations.value.findIndex((e: { id: number }) => e.id == item.id);
			event.dataTransfer.setData("startIndex", startIndex);
		}

		const onDragEnter = (event: any) => {
			event.target.classList.add("bg-secondary");
		}

		const onDragLeave = (event: any) => {
			event.target.classList.remove("bg-secondary");
		}

		const onDrop = (event: any, item: { id: number }) => {
			let startIndex = event.dataTransfer.getData("startIndex");
			let endIndex = locations.value.findIndex((e: { id: number }) => e.id == item.id);
			document.querySelectorAll<any>("#location-item")[endIndex].classList.remove("bg-secondary");

			let newLocations = swapItems(locations.value, startIndex, endIndex);
			store.dispatch("setLocalStorageLocations", newLocations);

			store.commit("SWAP_WEATHER", { startIndex: startIndex, endIndex: endIndex });
		}

		const swapItems = (array: string[], startIndex: number, endIndex: number) => {
			let temp = array[startIndex];
			array[startIndex] = array[endIndex];
			array[endIndex] = temp;

			return array;
		}

		const removeLocation = (item: { id: number }) => {
			let index = locations.value.findIndex((e: { id: number }) => e.id == item.id);
			store.commit("REMOVE_WEATHER", index);

			let newLocations = locations.value.filter((e: { id: number }) => e.id !== item.id);
			store.dispatch("setLocalStorageLocations", newLocations);

			if (!locations.value[0]) {
				store.dispatch("check");
			}
		}
		return {
			removeLocation,
			swapItems,
			onDrop,
			onDragLeave,
			onDragEnter,
			onDragStart,
			locations
		}
	}
};
</script>
