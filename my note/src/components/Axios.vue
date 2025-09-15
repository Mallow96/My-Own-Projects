<script setup>
import axios1 from "axios";
import { ref, onMounted } from "vue";
const thePosts = ref([]);

onMounted(async () => {
  try {
    const response = await axios1.get("https://jsonplaceholder.typicode.com/posts");
    console.log(response.data);
    thePosts.value = response.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="container">
    <h2>Axios</h2>

    <ul class="post-list">
      <li v-for="item in thePosts">
        <h4>id: {{ item.id }}</h4>
        <p>
        <span class="fw-bold">title: </span>
        {{ item.title }}
        </p>
        <p>
        <div class="fw-bold">body: </div>
        {{ item.body }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
