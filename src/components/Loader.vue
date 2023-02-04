<template>
	<div className="loader">
		<div></div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang='scss'>
.loader {
	display: flex;
	justify-content: center;
	padding: 20px 0;

	&>div {
		width: 20px;
		height: 20px;
		border: 2px solid var(--text-color);
		border-top: 2px solid var(--accent-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
}
</style>
