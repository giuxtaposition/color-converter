<script lang="ts">
	import { COLOR_MODELS_MIN_MAX, type ColorModelType } from '$lib/types/ColorModel';
	import { InputError } from '$lib/types/Error';

	export let colorModelSelected: ColorModelType;
	export let error: InputError | null;
	export let onInputChange: (values: string[]) => void;
	let input = '';

	$: hint = () => {
		const allMinMax = COLOR_MODELS_MIN_MAX[colorModelSelected];

		return allMinMax.map((min_max) => `${min_max[0]} < value < ${min_max[1]}`).join(', ');
	};
	$: isValidInput = error === null;
	$: handleChange(input, colorModelSelected);

	function handleChange(input: string, colorModelSelected: ColorModelType) {
		const values = parse(input);

		if (!values || values.length !== colorModelSelected.length) {
			error = InputError.InvalidNumberOfValues;
			return;
		}

		error = validate(values);
		onInputChange(values);
	}

	function parse(string: string) {
		return string.trim().match(/-?\d+/g);
	}

	function validate(values: string[]): InputError | null {
		for (const [index, value] of values.entries()) {
			const valueAsInt = parseInt(value);
			const min = COLOR_MODELS_MIN_MAX[colorModelSelected][index][0];
			const max = COLOR_MODELS_MIN_MAX[colorModelSelected][index][1];

			if (valueAsInt < min || valueAsInt > max) {
				return InputError.InvalidValue;
			}
		}

		return null;
	}
</script>

<div class="wrapper">
	<input
		type="text"
		bind:value={input}
		aria-label="color input"
		aria-required="true"
		aria-invalid={!isValidInput}
	/>
	<div class="hint">({hint()})</div>
	{#if error}
		<div class="errorMessage" role="alert">
			<p>{error}</p>
		</div>
	{/if}
</div>

<style lang="sass">
@use '../styles/common'

.wrapper
	@include common.textbox-wrapper

input
	@include common.textbox
	cursor: pointer

input[aria-invalid="true"]
	border: 1px solid #f47171

.hint
	width: 200px
	font-size: 0.8rem
	color: #9098a9

.errorMessage
	@include common.error

</style>
