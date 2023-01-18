<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Input from '$lib/components/Input.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import type { ColorModelType } from '$lib/types/ColorModel';
	import type { InputError } from '$lib/types/Error';

	let from: ColorModelType = 'rgb';
	let to: ColorModelType = 'cmy';
	let input: string[] = [];
	let error: InputError | null = null;

	function updateFrom(newValue: ColorModelType) {
		from = newValue;
	}
	function updateTo(newValue: ColorModelType) {
		to = newValue;
	}
	function updateInput(newValue: string[]) {
		input = newValue;
	}
	function updateError(newValue: InputError | null) {
		error = newValue;
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
		<Input colorModelSelected={from} onInputChange={updateInput} {error} onError={updateError} />
		<Selector
			name={'to-selector'}
			label={'To:'}
			optionToRemove={from}
			updateSelect={updateTo}
			bind:selected={to}
		/>
	</div>
</main>
