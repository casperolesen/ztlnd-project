
<template>
  <div>
    <h1>{{ title }}</h1>
    <h3>Antal: {{ count }}</h3>
  </div>
</template>

<script>
import { getRandomStories } from '../services/hackerNews'

export default {
  name: "Home",
  props: {
    title: String,
  },
  data() {
    return {
      list: [],
      count: 0,
    };
  },
  async created() {
    const topStories = await getRandomStories();
    this.count = topStories.length;
  },
};
</script>
