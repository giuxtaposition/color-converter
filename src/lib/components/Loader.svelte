<div>
	<span class="animation1" />
	<span class="animation2" />
	<span class="animation1" />
</div>

<style lang="sass">
span
    display: inline-block
    background-color: white
    width: 8px
    height: 8px
    margin: 2px
    border-radius: 100%
.animation1
    animation: beat 0.7s 0s infinite linear

.animation2
    animation: beat 0.7s 0.35s infinite linear

@keyframes beat
    50%
        transform: scale(0.75)
        opacity: 0.2
    100%
        transform: scale(1)
        opacity: 1

</style>
