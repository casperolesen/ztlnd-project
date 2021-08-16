<template>
  <div class="comment">
    <div class="comment-author">
      <p>
        by <span>{{ comment.by }}</span>
      </p>
    </div>
    <div class="comment-time">
      <p>
        {{ new Date(comment.time).toLocaleDateString() }}
      </p>
    </div>
    <p>{{ comment.text }}</p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
};
</script>

<style>
.comment {
  font-size: 12px;
  padding: 5px;
  margin-bottom: 12px;
  background-color: whitesmoke;
}
.comment-author {
  font-size: 12px;
}
.comment-author > p > span {
  font-weight: bold;
}
.comment-time {
  font-size: 10px;
}
</style>