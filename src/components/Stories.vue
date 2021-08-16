<template>
    <div :key="story.id" v-for="story in stories">
        <Story :story="story" />
    </div>
</template>

<script>
import Story from './Story.vue';

export default {
    name: 'Stories',
    props: {
        header: String,
        stories: Array
    },
    components: {
        Story
    }
}
</script>