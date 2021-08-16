<template>
    <div @mouseover="hover = true" @mouseleave="hover = false">
        <p>Author: {{author.id}}</p>
        <p>Karma: {{author.karma}}</p>

        <div :class="{hidden: !hover}">
            <p>{{author.about}}</p>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Author',
    props: {
        author: Object,
    },

    data() {
        return {
            hover: false,
        };
    }
}
</script>

<style>
.hidden {
    display: none;
}
</style>