import NotesAPI from "./notes.js";
import notesview from "./noteviews.js"

const app = document.body;

const view = new notesview(app, {
  onNoteAdd() {
    console.log("add new note");
  },
  
  onReturn() {
    console.log("retun to main page ");
  },
  onNoteEdit(newTitle,newBody){
      console.log(newTitle, newBody);
  }
});

view.updateNoteList(NotesAPI.getAllNotes());
