


const counter = document.getElementById("textarea_count");
const tetxarea = document.getElementById("textarea");

tetxarea.onkeyup = function (e) {
  const number = tetxarea.value.length;
  counter.innerHTML = number + "/350";
  if(number == "350"){
    counter.style.color = "#FF5C58";
  }else{
      counter.style.color = "#4d4d4d";
  }
};



const backButton = document.querySelector('.back');
const addNewNote = document.querySelector(".add-new");
const mainContainer = document.querySelector(".container");
const addNewNoteContainer = document.querySelector(".add-new-note");

addNewNoteContainer.style.display = "none";


backButton.addEventListener("click",()=>{
    addNewNoteContainer.style.display = "none";
    mainContainer.style.display = "grid";
});

addNewNote.addEventListener("click", () => {
    mainContainer.style.display = "none";
    addNewNoteContainer.style.display = "grid";
});


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