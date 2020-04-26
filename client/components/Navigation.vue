<template>
    <div class="wrapper"> 
        <nav class="nav">
            <img class="logo" src="../assets/images/logo.svg" />
        </nav>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
    name: 'navigation',
})
export default class Navigation extends Vue {

}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100vw;
    height: 75px;
}
.nav {
    position: fixed;
    z-index: 5;
    width: 100vw;
    height: 75px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

    @include grid();
    padding-top: 14px;
}

.logo {
    margin-left: $space;
    height: 50px;
    grid-column: span 2;
}
</style>