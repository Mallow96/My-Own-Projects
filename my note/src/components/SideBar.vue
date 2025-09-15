<script setup>
import { useNoteStore } from "../stores/note_store";
import { ref, onMounted } from "vue";

const noteStore = useNoteStore();
let selectedNoteId = ref(0);
let deleteModal = null;
const findTitle = ref("");

onMounted(() => {
  deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
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
  <div class="sidebar">
    <div class="container">
      <div class="row">
        <div class="col-12 my-3 text-center">
          <router-link :to="{ path: '/add' }">
            <button type="button" class="add-button btn btn-success w-75">Add</button>
          </router-link>
        </div>
        <div class="pinned col-12 my-3">
          <h5>Pinned</h5>
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="note in noteStore.pinnedNotes"
            >
              <span class="item-left">
                <i
                  class="icon fa-solid fa-thumbtack me-3 rotate"
                  @click="noteStore.markPinned(note.id)"
                ></i>
                <span>{{ note.title }}</span>
              </span>
              <span class="item-right">
                <router-link
                  :to="{ name: 'edit', params: { id: note.id } }"
                  class="text-black"
                >
                  <i class="icon fa-solid fa-pen-to-square"></i>
                </router-link>

                <i
                  class="icon fa-solid fa-trash ms-2"
                  @click="showDeleteModal(note.id)"
                ></i>
              </span>
            </li>
          </ul>
        </div>

        <div class="regular col-12 my-3">
          <h5>Items</h5>
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="note in noteStore.allNotes"
            >
              <span class="item-left">
                <i
                  class="icon fa-solid fa-thumbtack me-3"
                  @click="noteStore.markPinned(note.id)"
                ></i>
                <span>{{ note.title }}</span>
              </span>
              <span class="item-right">
                <router-link
                  :to="{ name: 'edit', params: { id: note.id } }"
                  class="text-black"
                >
                  <i class="icon fa-solid fa-pen-to-square"></i>
                </router-link>

                <i
                  class="icon fa-solid fa-trash ms-2"
                  @click="showDeleteModal(note.id)"
                ></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Deleting Note</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete this note titled
            <span class="text-danger fw-bold"> {{ findTitle }} </span>?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDelete()">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-button {
  color: white;
  &:hover {
    background-color: goldenrod;
    border-color: goldenrod;
  }
}

.sidebar {
  width: 100%;
  background: #f0f0f0;
  height: 90vh;
}
.modal {
  transition: opacity 0.3s ease;
}
.rotate {
  color: red;
  transform: rotate(45deg);
}

.icon:hover {
  color: goldenrod;
  cursor: pointer;
}
</style>
