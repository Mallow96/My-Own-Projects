<script setup>
import { ref, onMounted } from "vue";
import { useNoteStore } from "../stores/note_store";

const noteStore = useNoteStore();
let selectedNoteId = ref(0);
let deleteModal = null;
const findTitle = ref("");

onMounted(() => {
  deleteModal = new bootstrap.Modal(document.getElementById("gridDeleteModal"));
  console.log(noteStore.searchResults);
});

const showDeleteModal = (noteId) => {
  selectedNoteId.value = noteId;
  deleteModal.show();
  findTitle.value = noteStore.findItemTitle(noteId);
};

const confirmDelete = () => {
  noteStore.deleteItem(selectedNoteId.value);
  deleteModal.hide();
};
</script>
<template>
  <main id="result" class="container mt-4">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="note in noteStore.searchResults">
        <div class="card" :class="{ 'card-highlight': note.pinned }">
          <div class="card-header">
            <i
              class="icon fa-solid fa-thumbtack me-3 rotate"
              @click="noteStore.markPinned(note.id)"
            ></i>
          </div>
          <router-link :to="{ name: 'edit', params: { id: note.id } }" class="text-black">
            <div class="card-body">
              <h5 class="card-title">{{ note.title }}</h5>
              <p class="card-text text-truncate">
                {{ note.content }}
              </p>
            </div>
          </router-link>
          <div class="card-footer text-body-secondary text-end">
            <i class="icon fa-solid fa-trash ms-2" @click="showDeleteModal(note.id)"></i>
          </div>
        </div>
      </div>
      <!-- <div class="col" v-for="note in noteStore.allNotes">
        <div class="card">
          <div class="card-header">
            <i
              class="icon fa-solid fa-thumbtack me-3"
              @click="noteStore.markPinned(note.id)"
            ></i>
          </div>
          <router-link :to="{ name: 'edit', params: { id: note.id } }" class="text-black">
            <div class="card-body">
              <h5 class="card-title">{{ note.title }}</h5>
              <p class="card-text text-truncate">
                {{ note.content }}
              </p>
            </div>
          </router-link>

          <div class="card-footer text-body-secondary text-end">
            <i class="icon fa-solid fa-trash ms-2" @click="showDeleteModal(note.id)"></i>
          </div>
        </div>
      </div> -->
    </div>
  </main>

  <div class="modal" tabindex="-1" id="gridDeleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>確定刪除 "{{ findTitle }}" 資料？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="confirmDelete()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-frame .fa-thumbtack {
  position: relative;
  z-index: 3;
  top: 30px;
  left: 10px;
  cursor: pointer;
}
.card {
  transition: all 0.3s;
}
.card:hover {
  background-color: rgb(235, 235, 235);
  box-shadow: 1px 1px 10px #999;
}

.rotate {
  top: 10px;
  left: 10px;
  color: red;
  transform: rotate(45deg);
}

.card-highlight {
  border: 2px solid lightpink;
}

.icon:hover {
  color: goldenrod;
  cursor: pointer;
}
</style>
