<template>
  <div :key="author" v-for="author in authors" class="authors-list">
    <div class="button-select">
      <ButtonSelect
        :text="btnText"
        :color="btnColor"
        @click="onclick(author)"
      />
    </div>
    <Author :author="author" />
  </div>
</template>

<script>
import Author from './Author.vue';
import ButtonSelect from "./ButtonSelect.vue";

export default {
  name: "Authors",
  props: {
    header: String,
    btnText: String,
    btnColor: String,
    authors: Array,
    onclick: null,
  },
  components: {
    Author,
    ButtonSelect,
  },
};
</script>

<style>
.authors-list {
  display: flex;
  flex-wrap: nowrap;
}
.button-select {
  margin-right: 12px;
}
</style>