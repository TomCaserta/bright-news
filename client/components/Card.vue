<template>
    <div class="card">
        <div class="image" :style="`background-image: url(${require('../assets/images/temp.jpg')});`" />
        <div class="info">
            <h4>{{title}}</h4>
            <p class="description">All fears regarding Coronavirus has gone. People no longer care because it's over (not because they're dumb)People no longer care because it's over (not because they're dumb)People no longer care because it's over (not because they're dumb)People no longer care because it's over (not because they're dumb)</p>
            
            <div class="actions">
                <a href="http://outline.com" target="blank" rel="noopener">Read more</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "nuxt-property-decorator";

@Component({})
export default class Card extends Vue {
    @Prop(String)
    title!: string;

    @Prop(String)
    image!: string;

    @Prop(String)
    url!: string;

    @Prop(String)
    description!: string;
}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    width: 100%;

    /* Drop Shadow 1 */
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}

.image {
    border-radius: 4px 0px;
    background-size: cover;
    background-position: 50% 50%;
    height: 200px;
    width: 100%;
    display: block;
}

.description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
}

.actions {
    display: flex;
    justify-content: flex-end;
}

.info {
    padding: $space;
}

p, h4 {
    padding-top: $space--x-small;
}
</style>
