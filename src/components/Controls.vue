<template>
    <div>
        <!-- Pause -->
        
        

        <!-- Slower -->
        <img class="bg-white rounded hover:cursor-pointer mx-2 rotated"  @click="slower()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIBSURBVGhD7ZnPKwRhGMdXFAe5KUVu4qI4+AOUOEhxdnBz4uQ/cJCLHMgf4NfZxVUhN+VMjkpJIgeSX58v+9bTtrM7M3Z2vdP7qU87O/U2z3fm2Xdm3ykEAoFA4D/SXPxMS2vxs+EM4jZ2/HxLzhrO/242FgX5wmsc0Y6EbKHG72Hak1ETXBD5hkvYhHFxQeQVDmFDsEGch9iJcbBB5As2pNXKBZE3OIrVKA3i3Me6tlpUEPmOy1hpZosKIuvaajbIEy7iq9knT7AHy2GDHOCx+S7r1mo2yKN2wDDqbNqC7nEKS7FBtK2rp6v4UdznzLzVygUR7biDtphPXEd7EywN4hjHO7TjM221qCCOOXxGW9A59qGICiK6UW1px2bWatWCiAG8QFuQfk+zWCmIaMFV1NW042veanGCiDbcRFuMfDDb5YI4JjDTVosbxDGDtnhrpSAi01ZLGkT04hnagmS1ICKzVksTRKigFbTTbJwgjknUlO7Gyj+1WtogjjG8RY1PEkToyp6iO75M3Wp/DSK68AiTBhFRrbaLupfFJgQp4n1r5eLHnovpdxq9viHqEWUDbRHSq0eUfvT+odH7x3jN4Vq4s0XorHr1x0oHu0RbhFd/ddX3C+j94kOp3i4HWXOxQOf9kmkuFrFz8VpBC3Fpi/g3L3py8+otEAgEAhlQKHwDhC2rQBC6gycAAAAASUVORK5CYII=">

        <img v-if="playState" class="bg-white rounded hover:cursor-pointer mx-2" @click="pause()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB2SURBVGhD7dnBCcNADETRrSrFpI8Uk3pSWGzBuACTAQfzHuiyIME/7wIAfvfY5515zcNJs3Psz63LPPf5Zj7zcNLsHPtz6zJCQkibkBDSJiSEtAkJIW1CQkibkBDSJiSEtAkJIW1CQkibkPibkNt8KwDADay1AZozwcm8F5lJAAAAAElFTkSuQmCC">

        <!-- Play -->
        <img v-else class="bg-white rounded hover:cursor-pointer mx-2" @click="play()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFKSURBVGhD7dm/KsVxGMfxX4pBNjLJqpTNYDqDhUuQO1DcgMEVWIwGC5egcwVyATLLjAUpSf68H3zrk4iDzu/7PJ53veo426fw/Z3vabIsy7KspbYx/vrSd5e4wPLLT46zIU9vupiEy3SIucYqBuCq90OKQ0zDTTrkRl6bO2xgCNWnQzrYwaO8Z44xh6rTITP2Bs3jBDrmAVsYQZV9NMQaxibuoYNOsYjq+mxIaRZH0DFmD2Oopq+GWINYxy10zDmqOUi/M6Q0hQPoGFPFQdrLEMsOyhVcQcfYQbqG1g7SXoeUJrAPHWNaO0h/OqS0hDPomFYO0t8OsUaxCx1j+nqQ/sWQ0gLsnNExfTtIc4gU4lfL/R+7+3+/IQ5E948oIR4a3T/Gh/hg5f6jbpjLhzDXQcr1BZ0JcWXq/hI7xNcKYb7oybIsy/57TfMMeVT4gW4EYDcAAAAASUVORK5CYII=">

        <!-- Faster -->
        <img class="bg-white rounded hover:cursor-pointer ml-2"  @click="faster()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIBSURBVGhD7ZnPKwRhGMdXFAe5KUVu4qI4+AOUOEhxdnBz4uQ/cJCLHMgf4NfZxVUhN+VMjkpJIgeSX58v+9bTtrM7M3Z2vdP7qU87O/U2z3fm2Xdm3ykEAoFA4D/SXPxMS2vxs+EM4jZ2/HxLzhrO/242FgX5wmsc0Y6EbKHG72Hak1ETXBD5hkvYhHFxQeQVDmFDsEGch9iJcbBB5As2pNXKBZE3OIrVKA3i3Me6tlpUEPmOy1hpZosKIuvaajbIEy7iq9knT7AHy2GDHOCx+S7r1mo2yKN2wDDqbNqC7nEKS7FBtK2rp6v4UdznzLzVygUR7biDtphPXEd7EywN4hjHO7TjM221qCCOOXxGW9A59qGICiK6UW1px2bWatWCiAG8QFuQfk+zWCmIaMFV1NW042veanGCiDbcRFuMfDDb5YI4JjDTVosbxDGDtnhrpSAi01ZLGkT04hnagmS1ICKzVksTRKigFbTTbJwgjknUlO7Gyj+1WtogjjG8RY1PEkToyp6iO75M3Wp/DSK68AiTBhFRrbaLupfFJgQp4n1r5eLHnovpdxq9viHqEWUDbRHSq0eUfvT+odH7x3jN4Vq4s0XorHr1x0oHu0RbhFd/ddX3C+j94kOp3i4HWXOxQOf9kmkuFrFz8VpBC3Fpi/g3L3py8+otEAgEAhlQKHwDhC2rQBC6gycAAAAASUVORK5CYII=">
        
     
    
    </div>
</template>

<script>
export default {
    
    data() { return {

        playState: true

    }},

    methods: {

        play() {
            this.playState = true
            this.$emit('play')
        },

        pause() {
            this.playState = false
            this.$emit('pause')
        },

        faster() {
            this.$emit('faster')
        },

        slower() {
            this.$emit('slower')            
        }

    }

}
</script>


<style>

.rotated {

    transform: rotate(180deg)

}

</style>
