// Notes.vue : 筆記應用程式
<script>
export default{
  data() {
    return {
      listSwitch: false,
      idNumber: 1,
      notes: [
        {
          id: 1,
          content: null,
          showNote: true,
        },
      ],
    }
  },
  methods: {
    createNote() {
      this.closeAllNote();
      let newNote = {
        id: ++this.idNumber,
        content: null,
        showNote: true,
      };
      this.notes.push(newNote);
      this.notes[this.notes.length - 2].showNote = false;
    },

    delNote(index) {
      if (this.notes.length == 1) {
        this.notes.splice(index, 1);
        let newNote = {
          id: ++this.idNumber,
          content: null,
          showNote: true,
        };
        this.notes.push(newNote);
      } else {
        this.notes.splice(index, 1);
        this.closeAllNote();
        this.notes[this.notes.length - 1].showNote = true;
      }
    },

    selectedNote(index) {
      this.closeAllNote();
      this.notes[index].showNote = true;
      this.listSwitch = false;
    },
    listSW() {
      if (this.listSwitch == false) {
        this.listSwitch = true
      } else {
        this.listSwitch = false
      }
    },
    closeAllNote() {
      this.notes.forEach((note, index) => {
        this.notes[index].showNote = false;
      });
    }
  },

  watch: {
    notes: {
      handler() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
      },
      deep: true
    }
  },

  mounted() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 1, content: null, showNote: true }];
  }
};

</script>
<template>
  <div>
    <h2>筆記應用程式</h2>
  </div>
  <div class="container">
    <h1 class="title">online notepad</h1>
    <div id="notepad">
      <div class="panel">
        <button class="note-list-btn" @click="listSW">
          <i class="fa-solid fa-list"></i> list
        </button>
        <button class="create-note-btn" @click="createNote">
          <i class="fa-solid fa-plus"></i> new
        </button>
      </div>
      <textarea v-model="note.content" v-for="(note, index) in notes" v-show="note.showNote" placeholder="Type your notes here..."></textarea>
      <ul class="note-list" :class="{'list-switch': listSwitch}">
        <button class="close-list-btn" @click="listSW">
          <i class="fa-solid fa-minus"></i> close
        </button>
        <li v-for="(note, index) in notes" :data-id="note.id">
          <p @click="selectedNote(index)">{{note.content}}</p>
          <button @click="delNote(index)" class="del-note-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>   
</template>

<style scoped>
* {
    box-sizing: border-box;
    font-family: sans-serif, serif;
    letter-spacing: 1px;
}

html,body {
    font-size: 62.5%;
}

body {
    background-color: rgb(191, 181, 167);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    height: 100vh;
    .title {
        text-align: center;
        text-transform: uppercase;
        padding: 25px 0 5px; 
        font-size: 2.5rem;
        font-weight: 700;
        color: rgb(72, 69, 64);
    }
}

#notepad {
    width: 95%;
    margin: auto;
    button {
        border: none;
        border-radius: 5px;
        padding: 8px;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 1px;
        background-color: rgb(116, 112, 105);
        color: #fff;
        transition: all 0.3s;
        &:hover {
            background-color: rgb(92, 90, 85);
        }
    }
    .panel {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    textarea {
        width: 100%;
        height: 80vh;
        outline-color: rgb(245, 226, 182);
        border: none;
        display: block;
        padding: 5px;
        border-radius: 5px;
        font-size: 1.4rem;
        color: rgb(72, 69, 64);
    }
    .note-list {
        background-color: rgb(129, 125, 117);
        padding: 5px 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: 70%;
        height: 100%;
        transform: translateX(-100%);
        transition: all 0.3s;
        overflow-y: auto;
        .close-list-btn {
            float: right;
            margin-bottom: 10px;
            border: 1px solid rgb(238, 235, 230);
            color: rgb(238, 235, 230);
            transition: all 0.3s;
            &:hover {
                background-color: rgb(92, 90, 85);
            }
        }
        li {
            width: 100%;
            height: 35px;
            background-color: rgb(214, 206, 194);
            border-radius: 5px;
            margin-bottom: 8px;
            overflow: hidden;
            display: flex;
            &:last-child {
                margin-bottom: 0;
            }
            p { 
                flex: 1;
                cursor: pointer;
                padding: 10px;
                overflow : hidden;
                text-overflow : ellipsis;
                white-space : nowrap;
                font-size: 1.4rem;
                color: rgb(72, 69, 64);
                &:hover {
                    background-color: rgb(238, 235, 230);
                }
            }
            .del-note-btn {
                flex-basis: 12%;
                display: block;
                cursor: pointer;
                padding: 0;
                border: none;
                border-radius: 0;
                background-color: rgb(92, 90, 85);
                transition: all 0.3s;
                font-size: 1.4rem;
                color: rgb(214, 206, 194);
                &:hover {
                    color: #fff;
                    background-color: rgb(73, 72, 68);
                }
            } 
        }      
    }
    .list-switch {
        transform: translateX(0%);
        box-shadow: 0 0 10px rgb(117, 112, 105);
    }
}


@media screen and (min-width: 576px) {
    #notepad {
        .note-list {
            width: 50%;
        }
    }
}

@media screen and (min-width: 768px) {
    #notepad {
        .note-list {
            width: 45%;
        }
    }
}

@media screen and (min-width: 992px) {
    #notepad {
        .note-list {
            width: 35%;
        }
    }
}

@media screen and (min-width: 1200px) {
    #notepad {
        .note-list {  
            width: 25%;
        }
    }
}
</style>
