<script setup>
import { ref } from "vue";
import { useNoteStore } from "../stores/note_store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const noteStore = useNoteStore();
const router = useRouter();
const newTitle = ref("");
const newContent = ref("Add description for this note");
const addSuccess = ref(false);

const fnClearPlaceholderTitle = () => {
  const titleInput = document.querySelector("#title");
  titleInput.placeholder = "";
};

const fnClearContentArea = () => {
  newContent.value = "";
};

const fnCreateNote = () => {
  if (newTitle.value && newContent.value) {
    addSuccess.value = noteStore.addItem(newTitle.value, newContent.value);

    setTimeout(() => {
      addSuccess.value = false;
      router.push({ path: "/" });
    }, 1000);
  }
};

// // 路由和筆記儲存
// const route = useRoute();
// const router = useRouter();
// const newNoteTitle = ref("");
// const newNoteContent = ref("筆記內容...");
// const noteStore = useNoteStore();
// const { notes } = storeToRefs(noteStore);
// const { addItem } = noteStore;
// const showSuccessAlert = ref(false);
// //清空標題的input placeholder
// function clearPlaceholder() {
//   document.querySelector("#title").placeholder = "";
// }
// //清空文字輸入區域
// function clearTextArea() {
//   newNoteContent.value = "";
// }
// function createNote() {
//   if (newNoteTitle.value) {
//     addItem(newNoteTitle.value, newNoteContent.value);
//     // 顯示更新成功消息
//     showSuccessAlert.value = true;

//     // 設置一個計時器，在 2 秒後隱藏消息
//     setTimeout(() => {
//       showSuccessAlert.value = false;
//       router.push({ path: "/" });
//     }, 1000);
//   }
// }
</script>
<template>
  <div class="container p-5">
    <main>
      <div class="position-relative w-100 d-flex justify-content-center">
        <div
          class="alert alert-success position-absolute w-25 text-center"
          role="alert"
          v-show="addSuccess"
        >
          New Note Added!
        </div>
      </div>

      <h2 class="mb-5">Add a New Note</h2>
      <form @submit.prevent="fnCreateNote()">
        <div class="mb-3">
          <input
            type="text"
            v-model="newTitle"
            class="form-control"
            id="title"
            placeholder="New title here"
            @focus="fnClearPlaceholderTitle()"
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            id="note"
            rows="20"
            v-model="newContent"
            @focus="fnClearContentArea()"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-outline-success">
          Save and Exit <i class="fa-solid fa-floppy-disk"></i>
        </button>
      </form>
    </main>
  </div>
</template>
<style scoped>
form {
  position: relative;
}
/* .btn-outline-success {
  position: absolute;
  bottom: 20px;
  right: 20px;
} */
</style>
