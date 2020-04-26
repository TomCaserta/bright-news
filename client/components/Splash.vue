<template>
    <div class="splash"> 
        <div class="overlay" />
        <h1 class="heading">Get your daily dose of optimism</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
    name: 'splash',
})
export default class Splash extends Vue {

}
</script>

<style lang="scss" scoped>
.splash {
    background: url('../assets/images/splash.jpg');
    width: 100vw;
    height: 50vh;
    background-size: cover;
    background-position: 50% 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
}

.overlay {    
    position: absolute; 
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 62.5%);
    mix-blend-mode: darken;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.heading {
    color: #fff;
    font-weight: 500;
    text-align: center;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    z-index: 2;
    font-size: 24px;

    @include tablet() {
        font-size: 2em;
    }

    @include desktop() {
        font-size: 3em;
    }
}
</style>