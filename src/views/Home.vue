<template>
    <div class="home">
        <div class="logo" @click="toggleFullscreen"></div>
        <art-board/>
        <div class="birds"></div>
        <div class="cloud"></div>
        <div class="cloud2"></div>
    </div>
</template>

<script>
    import artBoard from '@/components/ArtBoard'
    import screenfull from 'screenfull'

    export default {
        name: 'home',
        components: {
            artBoard
        },
        data() {
            return {
                isFullScreen: false
            }
        },
        methods: {
            toggleFullscreen() {

                screenfull.toggle()
                this.isFullScreen = !this.isFullScreen
            }
        }

    }
</script>
<style lang="scss" scoped>
    .home {
        .logo {
            width: calc(1000rem / 96);
            height: calc(128rem / 96);
            margin: 0 auto;
            padding: calc(144rem / 96) 0 calc(0rem / 96) 0;
            //background: #42b983;
            background: url("../assets/img/logo.png") no-repeat center;
            background-size: 100%;
            cursor: pointer;
        }

        .birds {
            position: absolute;
            width: calc(480rem / 96);
            height: calc(200rem / 96);
            background: url("../assets/img/birds.png") no-repeat center;
            background-size: 100%;
            left: -40px;
            bottom: 48px;
            mix-blend-mode: multiply;
            //animation: birds linear 4s infinite;
        }

        .cloud {
            position: absolute;
            width: calc(240rem / 96);
            height: calc(132rem / 96);
            background: url("../assets/img/cloud.png") no-repeat center;
            background-size: 100%;
            left: 0px;
            top: calc(400rem / 96);
            mix-blend-mode: multiply;
            animation: cloud linear 6s infinite;
        }

        .cloud2 {
            position: absolute;
            width: calc(240rem / 96);
            height: calc(132rem / 96);
            background: url("../assets/img/cloud.png") no-repeat center;
            background-size: 100%;
            right: 0px;
            bottom: calc(320rem / 96);
            mix-blend-mode: multiply;
            animation: cloud linear 8s infinite;
        }

        @keyframes birds {
            0%, 100% {
                transform: translateY(-10px);
            }
            50% {
                transform: scale(.96) translateY(10px) translateX(-20px);
            }

        }
        @keyframes cloud {
            0%, 100% {
                transform: scale(.85) translateX(-40px);
            }
            50% {
                transform: scale(1) translateX(40px);
            }

        }

    }
</style>
