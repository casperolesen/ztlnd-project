<template>
  <div v-if="loaded" class="container">
    <div class="stories">
      <h3 class="column-header">Top Stories</h3>
      <Stories :stories="stories" />
    </div>

    <div class="stories">
      <h3 class="column-header">Subscribed Feed</h3>
      <div v-if="subscribedStories.length > 0">
        <Stories :stories="subscribedStories" />
      </div>
    </div>

    <div class="authors">
      <h3 class="column-header">Authors</h3>
      <Authors
        btnText="+"
        btnColor="green"
        :authors="authors"
        :onclick="subscribeAuthor"
      />
    </div>

    <div class="authors">
      <h3 class="column-header">Subscribed</h3>
      <div v-if="selected.length > 0">
        <Authors
          btnText="-"
          btnColor="red"
          :authors="selected"
          :onclick="unsubscribeAuthor"
        />
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import {
  getRandomStories,
  getAuthorsList,
  getLatestStoryByAuthor,
} from "./services/hackerNews";
import { sortAuthorsByKarma, sortByScore, sortMap } from "./util/helpers";
import Stories from "./components/Stories.vue";
import Authors from "./components/Authors.vue";

export default {
  name: "App",
  components: {
    Stories,
    Authors,
  },

  data() {
    return {
      loaded: false,
      stories: [],
      subscribedStories: [],
      authors: [],
      selected: [],
    };
  },

  async created() {
    const stories = sortByScore(await getRandomStories(10));
    this.stories = stories;

    const authors = sortMap(await getAuthorsList(20));
    this.authors = sortAuthorsByKarma(Array.from(authors.keys()));
    this.loaded = true;
  },

  methods: {
    async subscribeAuthor(author) {
      // Add author to list of subscribed authors
      this.selected.push(author);
      const temp = this.authors.filter((item) => item !== author);
      this.authors = temp;

      // Get latest story by selected author
      const latest = await getLatestStoryByAuthor(author.id);
      if (latest) {
        const feedTemp = [...this.subscribedStories];
        feedTemp.push(latest);
        this.subscribedStories = sortByScore(feedTemp);
      }
    },
    unsubscribeAuthor(author) {
      // Remove author from list of subscribed authors
      const tempAuthors = this.selected.filter((item) => item.id !== author.id);
      this.selected = tempAuthors;
      this.authors.push(author);

      // Remove story by author from feed
      const tempStories = this.subscribedStories.filter(
        (item) => item.authorId !== author.id
      );
      this.subscribedStories = tempStories;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin: 60px 60px;
}
.container {
  display: flex;
}
.column-header {
  font-size: 30px;
}
.btn {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.stories {
  width: 35%;
  padding-right: 30px;
}
.authors {
  width: 15%;
}
</style>
