<script lang="ts">
	export let title: string;
</script>

<h1>{title}</h1>

<style lang="sass">
@use '../styles/common'
h1
	color: transparent
	-webkit-background-clip: text
	background-clip: text
	background-image: linear-gradient(to right, common.$brand-400, common.$brand-600)
</style>
