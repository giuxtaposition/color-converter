<script lang="ts">
	import { COLOR_MODELS, type ColorModelType } from '$lib/types/ColorModel';

	export let name: string;
	export let label: string;
	export let optionToRemove: ColorModelType | null = null;
	export let selected: ColorModelType;
	export let updateSelect: (selected: ColorModelType) => void;

	$: colorModels = COLOR_MODELS.filter((representation) => representation !== optionToRemove);
	$: onOverlap(selected, optionToRemove);

	function onOverlap(selected: ColorModelType, optionToRemove: ColorModelType | null) {
		if (selected === optionToRemove) {
			console.log('OVERLAP FUNCTION');
			updateSelect(colorModels[0]);
		}
	}
</script>

<div>
	<label for={name}>
		{label}
	</label>

	<select {name} id={name} bind:value={selected}>
		{#each colorModels as colorModel}
			<option value={colorModel}>
				{colorModel.toUpperCase()}
			</option>
		{/each}
	</select>
</div>
