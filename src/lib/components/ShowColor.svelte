<script lang="ts">
	export let color: string;
</script>

<div style="background-color: {color};" />

<style lang="sass">
@use '../styles/common'

div
	@include common.box
</style>
