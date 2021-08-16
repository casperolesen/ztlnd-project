<template>
<div class="story"> 
    <div class="story-date">
        <span>{{new Date(story.timestamp * 1000).toLocaleDateString()}}</span>
    </div>
    <div class="story-header">
        <a :href=story.url>{{story.title}}</a>
        <span> | {{story.score}} score</span>
    </div>
    <div class="story-author">
        <span>by </span><span class="author-span">{{story.authorId}}</span>
        <span> | {{story.karmaScore}} karma</span>
    </div>
    <p>Score: {{story.score}}</p>
    <p>Author Karma: {{story.karmaScore}}</p>
    <p>Comments: {{story.commentsCount}}</p>

    <Comments :comments=story.comments />
</div>
</template>

<script>
import Comments from './Comments.vue';

export default {
    name: 'Story',
    props: {
        story: Object
    },
    components: {
        Comments
        }
}
</script>

<style>
.story {
    border-bottom: solid;
    border-width: 1px;
    margin-bottom: 12px;
}
.story-date {
    padding: 5px;
    background-color: violet;
}
.story-header {
    padding: 5px;
    background-color: rgba(32,59,98,.95);
    color: white;
}
.story-header a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    color: white;
}
.story-author {
    padding: 5px;
    background-color: turquoise;
}
.author-span {
    font-weight: 700;
}
</style>