import { createRouter, createWebHashHistory } from 'vue-router';
import NoteGrid from "../components/NoteGrid.vue";
import AddNote from '../components/AddNote.vue';
import EditNote from "../components/EditNote.vue";
import SearchNote from "../components/SearchNote.vue";


const routes = [
    { path: '/', name: 'grid', component: NoteGrid },
    { path: '/add', name: 'add', component: AddNote },
    { path: '/edit/:id', name: 'edit', component: EditNote },
    { path: '/search', name: 'search', component: SearchNote },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;