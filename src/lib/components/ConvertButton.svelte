<script lang="ts">
	import Loader from './Loader.svelte';

	export let isDisabled: boolean;
	export let isLoading: boolean;
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
    background: common.$brand-300
    cursor: pointer
    box-shadow: common.$shadow

button:disabled
    background: #ebebeb
    cursor: not-allowed

button:hover
    background: common.$brand-400
</style>
