<script setup>
// import Axios from "./components/Axios.vue";
import NavBar from "./components/ToolBar.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <!-- <Axios /> -->
  <header>
    <NavBar />
  </header>

  <div class="container">
    <div class="row">
      <aside class="col-4"><SideBar /></aside>
      <main class="col-8">
        <router-view></router-view>
      </main>
    </div>
  </div>

  <footer>
    <p>CopyRight &copy; Mallow Liu</p>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

footer p {
  color: white;
  line-height: 50px;
  text-align: center;
  margin: 0;
}
</style>
