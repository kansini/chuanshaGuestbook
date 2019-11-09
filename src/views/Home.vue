<template>
    <div class="home">
        <handwriting />
    </div>
</template>

<script>
    // @ is an alias to /src
    import handwriting from '@/components/Handwriting'

    export default {
        name: 'home',
        components: {
            handwriting
        }
    }
</script>
