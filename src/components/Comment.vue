<template>
    <p>{{comment.text}}</p>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        comment: Object
    }
}
</script>