<script lang="ts">
	import ConvertButton from '$lib/components/ConvertButton.svelte';
	import Header from '$lib/components/Header.svelte';
	import Input from '$lib/components/Input.svelte';
	import Output from '$lib/components/Output.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import { getColorRepresentation } from '$lib/services/colorService';
	import type { ColorModelType } from '$lib/types/ColorModel';
	import { InputError, OutputError } from '$lib/types/Error';

	let from: ColorModelType = 'rgb';
	let to: ColorModelType = 'cmy';
	let input: string[] = [];
	let output: string = '';

	let inputError: InputError | null = null;
	let outputError: OutputError | null = null;
	let isLoading = false;

	function updateFrom(newValue: ColorModelType) {
		from = newValue;
	}
	function updateTo(newValue: ColorModelType) {
		to = newValue;
	}
	function updateInput(newValue: string[]) {
		input = newValue;
	}

	async function onSubmit() {
		if (!inputError) {
			isLoading = true;
			const result = await getColorRepresentation(from, to, input);

			if (result) {
				output = result.join(', ');
			} else {
				outputError = OutputError.UnsuccessfulConversion;
			}
			isLoading = false;
		}
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
		<Input colorModelSelected={from} onInputChange={updateInput} bind:error={inputError} />
		<Selector
			name={'to-selector'}
			label={'To:'}
			optionToRemove={from}
			updateSelect={updateTo}
			bind:selected={to}
		/>
		<Output {output} error={outputError} />

		<ConvertButton isDisabled={inputError !== null} {isLoading} onClick={onSubmit} />
	</div>
</main>
