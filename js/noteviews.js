export default class notesview {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete, onReturn } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.onReturn = onReturn;
    this.root.innerHTML = `

    <div class="container">
      <div class="header">
        <img src="images/logo.png" alt="" />
        <h1>Simple Note</h1>
      </div>
      <a  class="add-new button">
        <img src="images/addnote.png" alt="" />
      </a>
      <div class="notes"></div>
      <div class="footer">
        <p>made by <a href="https://github.com/snndmnsz" target="_blank" rel="noopener noreferrer">snndmnsz</a> with 🖤</p>
      </div>
    </div>

    <div class="add-new-note hidden">

        <div class="controller">
          <svg class="button back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/></svg>

         <svg class="button delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"/></svg>
        </div>

        <div class="note-header-area">
            <input type="text" maxlength="14" placeholder="write a title" class="inputTitle">
            <p class="note-date"></p>
        </div>

        <div class="note-text-area">
          
            <textarea id="textarea"  maxlength="300" class="textarea" placeholder="write note here..." ></textarea>

            <span class="textarea_count" id="textarea_count">0/350</span>
        </div>
    </div>
    `;

    const btnAddNote = this.root.querySelector(".add-new");
    const backButton = this.root.querySelector(".back");

    const mainContainer = this.root.querySelector(".container");
    const addNewNoteContainer = this.root.querySelector(".add-new-note");

    const inputBody = this.root.querySelector(".textarea");
    const inputTitle = this.root.querySelector(".inputTitle");

    const deleteButton = this.root.querySelector(".delete");

    btnAddNote.addEventListener("click", () => {
      inputBody.value = "";
      inputTitle.value = "";
      mainContainer.classList.add("hidden");
      addNewNoteContainer.classList.remove("hidden");
      this.onNoteAdd();
    });

    backButton.addEventListener("click", () => {
      addNewNoteContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
      this.onReturn();
    });

    deleteButton.addEventListener("click", () => {
      addNewNoteContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
      this.onNoteDelete();
    });

    const counter = this.root.querySelector(".textarea_count");
    inputBody.onkeyup = function (e) {
      const number = inputBody.value.length;
      counter.innerHTML = number + "/300";
      if (number == "300") {
        counter.style.color = "#FF5C58";
      } else {
        counter.style.color = "#4d4d4d";
      }
    };

    // CLOSE CTRL S
    document.onkeydown = function (e) {
      e = e || window.event; //Get event
      if (e.ctrlKey) {
        var c = e.which || e.keyCode; //Get key code
        switch (c) {
          case 83: //Block Ctrl+S
            e.preventDefault();
            e.stopPropagation();
            break;
        }
      }
    };

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inputTitle.value.trim();
        const updatedBody = inputBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 25;

    return `<div class="note" data-note-id="${id}">
            <div class="note-info">
              <h2 class="note-header">${title}</h2>
              <p class="date">
              ${updated.toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })}</p>
            </div>
          <p class="preview">
          ${body.substring(0, MAX_BODY_LENGTH)}
          ${body.length > MAX_BODY_LENGTH ? "..." : ""}</p>
        </div>`;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes");

    // Empty list
    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select/delete events for each list item
    notesListContainer.querySelectorAll(".note").forEach((noteListItem) => {
      noteListItem.addEventListener("click", () => {
        this.onNoteSelect(noteListItem.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".note-date").innerHTML ="";
    this.root.querySelector(".inputTitle").value = note.title;
    this.root.querySelector(".textarea").value = note.body;
    console.log(note.updated);
    try {
    
      if (note.updated == undefined) {
        //console.log("invalid bu kisim ");
      } else {
        let timestamp = new Date(note.updated).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        });
        this.root.querySelector(".note-date").innerHTML = timestamp;
        //console.log("invalid ddegil ");
      }
        //this.root.querySelector(".note-date").innerHTML = timestamp;
    } catch (error) {
      console.error("date error.");
    }
    
   

    const inputBody = this.root.querySelector(".textarea");
    const counter = this.root.querySelector(".textarea_count");
    const number = inputBody.value.length;
    counter.innerHTML = number + "/300";


    

    this.root.querySelector(".container").classList.add("hidden");
    this.root.querySelector(".add-new-note").classList.remove("hidden");
  }
}
