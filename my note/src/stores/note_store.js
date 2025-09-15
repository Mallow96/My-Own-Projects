// 在 Setup Store 中：
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions
import { defineStore } from 'pinia';
import { ref, computed, reactive, watch, onMounted  } from "vue";
import { useRouter,useRoute } from 'vue-router';

//setup 語法
export const useNoteStore = defineStore('notes', () => {
    // ref() 就是 state 属性
    // const noteStore = useNoteStore();

    const router = useRouter();
    const route = useRoute();

    const notes = reactive([
        {
            id: 1,
            title: 'Homework',
            content: "Complete Chapter 11 of the history homework.",
            pinned: true
        },
        {
            id: 2,
            title: 'Study Plan',
            content: "Spend one hour every night learning new technologies to improve skills.",
            pinned: false
        },
        {
            id: 3,
            title: 'Exercise',
            content: "Jog for 30 minutes every Wednesday to stay healthy.",
            pinned: false
        },
        {
            id: 4,
            title: 'Read Books',
            content: "Finish reading 'Deep Work' this month.",
            pinned: false
        },
        {
            id: 5,
            title: 'Shopping List',
            content: "Milk, bread, eggs, vegetables.",
            pinned: false
        },
        {
            id: 6,
            title: 'Contact Friends',
            content: "Ask Xiao Ming out for dinner and a chat this weekend.",
            pinned: true
        },
    ])

    // const isLoaded = ref(false);
    // const selectedNoteId = ref(null);
    // const keyword = ref(null);

    // computed() 就是 getters

    const pinnedNotes = computed(() => {
        return notes.filter(note => note.pinned);
    });

    const allNotes = computed(() => {
        return notes.filter(note => !note.pinned);
    });

    // function() 就是 actions

    const markPinned = (id) => {
        const note = notes.find(note => note.id === id);
        note.pinned = !note.pinned;
    }

    const findItemTitle = (id) => {
        const note = notes.find(note => note.id === id);
        return note.title;
    }

    const deleteItem = (id) => {
        const index = notes.findIndex(note => note.id === id);
        notes.splice(index, 1);
    }

    const addItem = (newTitle, newContent) => {
        if (newTitle == null || newContent == null) return false
        else {
            const latestId = notes.length + 1;
            notes.push({
                id: latestId,
                title: newTitle,
                content: newContent,
                pinned: false
            })
            return true;
        }
    }

    const editItem = (id, newTitle, newContent) => {
        const note = notes.find(note => note.id === id);
        if (note !== -1) {
            note.title = newTitle;
            note.content = newContent;
            return true
        } else {
            return false;
        }
    }

    const searchResults = ref([]);
    const searchNotes = (keyword) => {
        const kw = keyword.toLowerCase();

        searchResults.value = notes.filter(note =>
            note.title.toLowerCase().includes(kw) ||
            note.content.toLowerCase().includes(kw)
        );
    }

    const saveLocalStorage = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    const loadLocalStorage = () => {
        const data = localStorage.getItem('notes');
        if (data) {
            const parsed = JSON.parse(data);
            notes.splice(0, notes.length, ...parsed);
        } else {
            console.log('No data in localStorage');
        }}

    watch(notes, () => {
        saveLocalStorage();
    }, { deep: true });

    onMounted(() => {
        loadLocalStorage();
    })

    return { 
            notes, 
            allNotes, 
            pinnedNotes, 
            searchResults, 
            markPinned, 
            deleteItem, 
            addItem, 
            editItem, 
            findItemTitle, 
            searchNotes, 
         };
})

// option語法
// export const useFruitStore = defineStore('fruits', {
//     state: () => ({
//         name: "水蜜桃",
//         price: 100
//     }),

//     getters: {
//     },

//     actions: {

//     },
// })