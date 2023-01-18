<script lang="ts">
	import type { OutputError } from '$lib/types/Error';

	export let error: OutputError | null;
	export let output: string;
</script>

<div>
	<output aria-label="color output">
		{output}
	</output>
	{#if error}
		<div id="errorMessage" role="alert">
			<p>{error}</p>
		</div>
	{/if}
</div>

<style lang="sass">
output
	display: block
	width: 170px
	height: 20px
	border: 1px solid grey
</style>
