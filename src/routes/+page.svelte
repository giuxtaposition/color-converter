<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import type { ColorModelType } from '$lib/types/ColorModel';

	let from: ColorModelType = 'rgb';
	let to: ColorModelType = 'cmy';

	function updateFrom(newValue: ColorModelType) {
		from = newValue;
	}
	function updateTo(newValue: ColorModelType) {
		to = newValue;
	}
</script>

<main>
	<Header title="Color Converter" />
	<div>
		<Selector
			name={'from-selector'}
			label={'From:'}
			updateSelect={updateFrom}
			bind:selected={from}
		/>
		<Selector
			name={'to-selector'}
			label={'To:'}
			optionToRemove={from}
			updateSelect={updateTo}
			bind:selected={to}
		/>
	</div>
</main>
