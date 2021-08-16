<template>
  <div class="story">
    <div class="story-header">
      <div>
        <span>{{ new Date(story.timestamp * 1000).toLocaleDateString() }}</span>
      </div>

      <div>
        <span>{{ story.score }} score</span>
      </div>
    </div>

    <div class="story-title">
      <div>
        <a :href="story.url">{{ story.title }}</a>
      </div>
    </div>

    <div class="story-footer">
      <div>
        <span>by </span><span class="author-span">{{ story.authorId }}</span>
      </div>
      <div>
        <span>{{ story.karmaScore }} karma</span>
      </div>
    </div>

    <div class="story-comments-counter-container">
      <div class="story-comments-counter">
        <span>{{ story.commentsCount }} Comments</span>
      </div>
      <div class="btn-container">
        <button class="btn-toogle-comments" @click="toogleComments">
          {{ displayComments ? "Hide" : "Show" }}
        </button>
      </div>
    </div>

    <div class="story-comments" v-if="displayComments">
      <Comments :comments="story.comments" />
    </div>
  </div>
</template>

<script>
import Comments from "./Comments.vue";

export default {
  name: "Story",
  props: {
    story: Object,
  },
  data() {
    return {
      displayComments: false,
    };
  },
  components: {
    Comments,
  },
  methods: {
    toogleComments() {
      this.displayComments = !this.displayComments;
    },
  },
};
</script>

<style>
.story {
  padding: 5px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  background-image: url("~@/assets/zetland_og.jpg");
}

.story-header {
  display: flex;
  font-size: 12px;
}

.story-header > div {
  margin-right: 2px;
  padding: 5px;
  color: rgba(32, 59, 98, 0.95);
  background-color: white;
}

.story-title {
  display: flex;
  color: white;
}

.story-title > div {
  padding: 5px 0px;
}

.story-title a {
  padding: 5px;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  background-color: rgba(32, 59, 98, 0.95);
  color: white;
}

.story-footer {
  display: flex;
  font-size: 12px;
  margin-bottom: 12px;
}

.story-footer > div {
  margin-right: 2px;
  padding: 5px;
  color: rgba(32, 59, 98, 0.95);
  background-color: white;
}

.story-comments-counter-container {
  display: flex;
  font-size: 12px;
}

.story-comments-counter-container > div {
  padding: 5px;
  align-self: center;
}

.story-comments-counter {
  background-color: white;
}

.btn-container {
  background-color: transparent;
}

.story-comments {
  margin-top: 12px;
}
.author-span {
  font-weight: 700;
}
</style>