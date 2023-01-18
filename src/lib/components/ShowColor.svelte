<script lang="ts">
	import Loader from './Loader.svelte';

	export let color: string;
	export let isLoading: boolean;
</script>

<div style="background-color: {isLoading ? 'rgb(148, 208, 240)' : color};">
	{#if isLoading}
		<Loader />
	{/if}
</div>

<style lang="sass">
@use '../styles/common'

div
	@include common.box
	display: flex
	justify-content: center
	align-items: center
</style>
