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

<style lang="sass">
@use '../styles/common'
button
    padding: 0.5rem 1rem
    border: common.$border
    border-radius: 5px
    background: rgb(148, 208, 240)
    cursor: pointer
    box-shadow: common.$shadow

button:disabled
    background: #ebebeb
    cursor: not-allowed

</style>
