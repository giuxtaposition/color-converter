<script lang="ts">
	import { COLOR_MODELS_MIN_MAX, type ColorModelType } from '$lib/types/ColorModel';
	import { InputError } from '$lib/types/Error';

	export let colorModelSelected: ColorModelType;
	export let error: InputError | null;
	export let onError: (error: InputError | null) => void;
	export let onInputChange: (values: string[]) => void;

	$: hint = () => {
		const allMinMax = COLOR_MODELS_MIN_MAX[colorModelSelected];

		return allMinMax.map((min_max, index) => `${min_max[0]} < value < ${min_max[1]}`).join(', ');
	};

	$: isValidInput = error === null;

	function handleChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const values = parse(event.currentTarget.value);

		if (!values || values.length !== colorModelSelected.length) {
			onError(InputError.InvalidNumberOfValues);
			return;
		}

		onError(validate(values));
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

<div>
	<input
		type="text"
		on:input={handleChange}
		aria-label="color input"
		aria-required="true"
		aria-invalid={!isValidInput}
	/>
	<div>({hint()})</div>
	{#if error}
		<div id="errorMessage" role="alert">
			<p>{error}</p>
		</div>
	{/if}
</div>
