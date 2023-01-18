<script lang="ts">
	import ConvertButton from '$lib/components/ConvertButton.svelte';
	import Header from '$lib/components/Header.svelte';
	import Input from '$lib/components/Input.svelte';
	import Output from '$lib/components/Output.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import ShowColor from '$lib/components/ShowColor.svelte';
	import { getColorRepresentation } from '$lib/services/colorService';
	import type { ColorModelType } from '$lib/types/ColorModel';
	import { InputError, OutputError } from '$lib/types/Error';

	let from: ColorModelType = 'rgb';
	let to: ColorModelType = 'cmy';
	let input: string[] = [];
	let output = '';

	let inputError: InputError | null = null;
	let outputError: OutputError | null = null;
	let isLoading = false;
	let colorInRGB = '';

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

			if (result.valuesInRepresentation && result.valuesInRGB) {
				output = result.valuesInRepresentation.join(', ');
				colorInRGB = `rgb(${result.valuesInRGB.join(', ')})`;
			} else {
				outputError = OutputError.UnsuccessfulConversion;
			}

			isLoading = false;
		}
	}
</script>

<main>
	<Header title="Color Converter" />

	<div class="input">
		<Selector
			name={'from-selector'}
			label={'From:'}
			updateSelect={updateFrom}
			bind:selected={from}
		/>
		<Input colorModelSelected={from} onInputChange={updateInput} bind:error={inputError} />
	</div>

	<div class="output">
		<Selector
			name={'to-selector'}
			label={'To:'}
			optionToRemove={from}
			updateSelect={updateTo}
			bind:selected={to}
		/>
		<Output {output} error={outputError} />
	</div>

	<ShowColor color={colorInRGB} {isLoading} />

	<ConvertButton isDisabled={inputError !== null} {isLoading} onClick={onSubmit} />
</main>

<style lang="sass">
@use '../lib/styles/common'

:global(body)
	position: fixed
	margin: 0
	background-color: common.$brand-50
	min-height: 100vh
	min-width: 100vw

main
	font-size: 16px
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	margin: 6rem
	padding: 2rem
	background-color: white
	gap: 2rem
	box-shadow: common.$shadow
	border-radius: 5px

@media (max-width: 600px)
	main
		width: 100vw
		height: 100vh
		margin: 0
		padding: 0
		gap: 1rem

.input, .output
	display: flex
	flex-direction: row
	align-items: center
</style>
