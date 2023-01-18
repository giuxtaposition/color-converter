<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { OutputError } from '$lib/types/Error';

	export let error: OutputError | null;
	export let output: string;
</script>

<div class="wrapper">
	<output aria-label="color output">
		{output}
	</output>
	{#if error}
		<div in:fade={{ delay: 200, duration: 500 }} class="errorMessage" role="alert">
			<p>{error}</p>
		</div>
	{/if}
</div>

<style lang="sass">
@use '../styles/common'
.wrapper
	@include common.textbox-wrapper

output
	@include common.textbox
</style>
