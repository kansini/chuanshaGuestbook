<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
    li{
        list-style: none;
    }

    #app {
        width: 100%;
        height: 100vh;
        background: url("./assets/img/mainbg.jpg") no-repeat center;
        background-size: 100% 100%;
        overflow: hidden;
    }
</style>
