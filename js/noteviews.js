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

    <div class="front-page">
      <div class="front-header">
        <i class="ri-booklet-line"></i>
        <h1>SimpleNote</h1>
      </div>
      <div class="front-error">
        <i class="ri-error-warning-line"></i>
      </div>
      <div class="front-text">
        <p>
          SimpleNote App saves data to local storage. If you delete the cookies,
          all the notes also will be deleted.
        </p>
        <p>Please do not write anything very
          important to here and backup data before deleting cookies.
          <span>We are not responsible for the loss of your data.</span></p>
      </div>
      <div class="front-button">
        <div class="front-btn">I UNDERSTAND</div>
      </div>
    </div>

    <div class="container hidden">
      <div class="header">
        <div class="head">
        <i class="ri-booklet-line"></i>
        <h1>SimpleNote</h1>
        </div>
        <div class="right">
        <div class="dark-mode" id="theme-switcher">
          <i class="ri-moon-line" ></i>
          <i class="ri-sun-line"></i> 
        </div>
        <i class="ri-information-line info-btn"></i>
        </div>
      </div>
      <a  class="add-new button">
        <i class="ri-add-line"></i>
      </a>
      <div class="notes"></div>
      <div class="footer">
        <p>made by <a href="https://github.com/snndmnsz" target="_blank" rel="noopener noreferrer">snndmnsz</a> with 🖤</p>
      </div>
    </div>

    <div class="add-new-note hidden">

        <div class="controller">
          <i class="ri-arrow-left-line button back"></i>

         <i class="ri-delete-bin-2-line button delete"></i>
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

    <div class="about hidden">
      <div class="about-header">
        <i class="ri-arrow-left-line about-back"></i>
      </div>
      <div class="about-text-area">
        <div class="about-logo">
          <i class="ri-booklet-line"></i>
          <h1>SimpleNote</h1>
        </div>
        <p class="about-version"></p>
        <p class="about-info">
        The simple note  is minimalist-basic note taking app runs as browser extension. 
        App uses Local Storage to store all note data. 
        App works on Google Chrome , Firefox and Opera.
        App basically works in all Chromium based browsers.
        </p>
        <div class="about-buttons">
          <div class="support about-btn ">
            <i class="ri-heart-3-line"></i>
            <p>support me</p>
          </div>
          <div class="bug about-btn">
            <i class="ri-bug-line"></i>
            <p>bug report</p>
          </div>
        </div>
      </div>
      <div class="about-footer"> <p>made by <a href="">snndmnsz</a> with 🖤</p></div>
    </div> 

    `;

    const btnAddNote = this.root.querySelector(".add-new");
    const backButton = this.root.querySelector(".back");

    const mainContainer = this.root.querySelector(".container");
    const addNewNoteContainer = this.root.querySelector(".add-new-note");

    const inputBody = this.root.querySelector(".textarea");
    const inputTitle = this.root.querySelector(".inputTitle");

    const deleteButton = this.root.querySelector(".delete");

    const aboutPageContainer = this.root.querySelector(".about");
    const aboutBack = this.root.querySelector(".about-back");
    const aboutInfo = this.root.querySelector(".info-btn");
    const version = this.root.querySelector(".about-version");

    const understanButton = this.root.querySelector(".front-btn");
    const understanContainer = this.root.querySelector(".front-page");


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

    aboutInfo.addEventListener("click", () => {
      fetch("../manifest.json")
        .then((response) => response.json())
        .then((data) => (version.innerHTML = `v${data.version}`))
        .catch((error) => console.log(error));
      mainContainer.classList.add("hidden");
      aboutPageContainer.classList.remove("hidden");
    });

    aboutBack.addEventListener("click", () => {
      aboutPageContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
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

    understanButton.addEventListener("click", () => {
      localStorage.setItem("disclaimer", "yes");
      understanContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
      
    });

    
 
    //document.documentElement.setAttribute("dark-mode", "light");

    document.addEventListener("DOMContentLoaded", function (event) {
      let trans = () => {
        document.documentElement.classList.add("transition");
        window.setTimeout(() => {
          document.documentElement.classList.remove("transition");
        }, 500);
      };



      const getUnderstand = localStorage.getItem("disclaimer");
      if (getUnderstand === null) {
        localStorage.setItem("disclaimer", "no");
      } else if (getUnderstand === "yes") {
        understanContainer.classList.add("hidden");
        mainContainer.classList.remove("hidden");
      } else if (getUnderstand === "no") {
        mainContainer.classList.add("hidden");
        understanContainer.classList.remove("hidden");
      }
      
      




      const getDark = localStorage.getItem("selected-theme");
      if (getDark !== null){
        document.documentElement.setAttribute("dark-mode", getDark);
      }else if (getDark === null){
        localStorage.setItem("selected-theme", "dark");
        const getDark = localStorage.getItem("selected-theme");
        document.documentElement.setAttribute("dark-mode", getDark);
      }

      // Get our button switcher
      var themeSwitcher = document.getElementById("theme-switcher");
      // When our button gets clicked
      themeSwitcher.onclick = function () {
      
        var currentTheme = document.documentElement.getAttribute("dark-mode");
        var switchToTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("dark-mode", switchToTheme);
        localStorage.setItem("selected-theme", switchToTheme);

        trans();
      };
    });
  }

  _createListItemHTML(id, title, body, updated, color) {
    const MAX_BODY_LENGTH = 25;

    return `<div style="border-left: 4px solid ${color};" class="note" data-note-id="${id}">
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
        new Date(note.updated),
        note.color
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
    this.root.querySelector(".note-date").innerHTML = "";
    this.root.querySelector(".inputTitle").value = note.title;
    this.root.querySelector(".textarea").value = note.body;
    //console.log(note.updated);
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
