<template>
    <div class="home">
        <div class="logo"></div>
        <art-board/>
    </div>
</template>

<script>
    import artBoard from '@/components/ArtBoard'

    export default {
        name: 'home',
        components: {
            artBoard
        }
    }
</script>
<style lang="scss" scoped>
    .home {
        .logo {
            width: calc(980rem / 96);
            height: calc(82rem / 96);
            margin: 0 auto;
            padding: calc(144rem / 96) 0 calc(0rem / 96) 0;
            //background: #42b983;
            background: url("../assets/img/logo.png") no-repeat center;
            background-size: 100%;
            cursor: pointer;
        }

    }
</style>
