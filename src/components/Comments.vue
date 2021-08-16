<template>
    <div :key="comment.id" v-for="comment in comments">
        <Comment :comment="comment" />
    </div>
</template>

<script>
import Comment from './Comment.vue';

export default {
    name: 'Comments',
    props: {
        comments: Array,
    },
    components: {
        Comment,
    }
}
</script>