<template>
    <section>
        <Navigation />
        <Splash />
        <div class="articles">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.articles {
    padding: $space;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;

    @include grid(1);

    @include tablet() {
        @include grid(2);
    }
    
    @include desktop() {
        @include grid(3);
    }
}
</style>

<script lang="ts">
import {
    Component,
    Vue
} from "nuxt-property-decorator";
import { State } from "vuex-class";
import Navigation from "~/components/Navigation.vue";
import Splash from "~/components/Splash.vue";
import Card from "~/components/Card.vue";


@Component({
    components: {
        Navigation,
        Splash,
        Card,
    }
})
export default class extends Vue {
    articles: any[] = [];

    created() {
        this.$fetch();
    }
    async $fetch() {
        this.articles = await this.$axios.$get('http://localhost:3000/api/v1/articles/top');
        console.log(this.articles);
    }
}
</script>

