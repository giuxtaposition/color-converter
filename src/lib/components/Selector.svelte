<script lang="ts">
	import { COLOR_MODELS, type ColorModelType } from '$lib/types/ColorModel';

	export let name: string;
	export let label: string;
	export let optionToRemove: ColorModelType | null = null;
	export let selected: ColorModelType;
	export let onSelectOverlap: (selected: ColorModelType) => void;

	$: colorModels = COLOR_MODELS.filter((representation) => representation !== optionToRemove);
	$: onOverlap(selected, optionToRemove);

	function onOverlap(selected: ColorModelType, optionToRemove: ColorModelType | null) {
		if (selected === optionToRemove) {
			onSelectOverlap(colorModels[0]);
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

<style lang="sass">
@use '../styles/common'

div
	margin: 2rem
	width: 75px
	height: 5rem

label
	font-size: 1rem

select
	margin-top: 0.5rem
	padding: 0.3rem 0.2rem
	width: 100%
	border: common.$border
	border-radius: 5px
	background: white
	box-shadow: common.$shadow
	cursor: pointer
</style>
