<script lang="ts">
	import Loader from './Loader.svelte';

	export let isDisabled = false;
	export let isLoading = false;
	export let onClick: () => void;
</script>

<button on:click={onClick} disabled={isDisabled}>
	{#if isLoading}
		<Loader />
	{:else}
		Convert
	{/if}
</button>
