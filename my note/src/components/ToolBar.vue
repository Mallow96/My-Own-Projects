<script setup>
import { ref, onMounted, watch } from "vue";
import { useNoteStore } from "../stores/note_store";
import { useRouter,useRoute } from "vue-router";

const noteStore = useNoteStore();
const router = useRouter();
const route = useRoute()

const keyword = ref(route.query.keyword || "");   

const showSearch = () => {
  router.push({ name: "search", query: { keyword: keyword.value } });
};

watch(
  () => route.query.keyword,
  (newKeyword) => {
    if(newKeyword){
      noteStore.searchNotes(newKeyword);
      keyword.value = newKeyword;
    } 
    else {
      keyword.value = "";
      noteStore.searchResults = [];
      router.push({ name: "grid" });
  }
  },
  { immediate: true }
);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="/">
        <img src="../../public/logo.png" alt="" class="logo" />
        <span>My Note</span>
      </a>

      <form class="d-flex" role="search" @submit.prevent="showSearch()">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="keyword"
           @input="showSearch()"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  width: 4rem;
}
</style>
