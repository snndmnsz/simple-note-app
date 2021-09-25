import NotesAPI from "./notes.js";
import notesview from "./noteviews.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new notesview(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);

    // if (notes.length > 0) {
    //   this._setActiveNote(notes[0]);
    // }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    //this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteSelect: (noteId) => {
        // console.log("Note selected " + noteId);
        // console.log("sleected type is :" + typeof noteId);
        const selectedNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNote(selectedNote);
        // console.log("this._setActiveNote :" + typeof selectedNote);
        // console.log("this._setActiveNote :" +  selectedNote);
      },
      onNoteAdd: () => {
        const newId = Math.floor(Math.random() * 1000000);

        const newNote = {
          id: newId,
          title: "",
          body: "",
        };
        NotesAPI.saveNote(newNote);
        this._setActiveNote(newNote);
        this.activeNote.id = newId;
        this._refreshNotes();
      },

      onNoteEdit: (title, body) => {
        // console.log("title:  " + title + "body: " + body);
        let activeid = this.activeNote.id * 1;
        NotesAPI.saveNote({
          id: activeid,
          title,
          body,
        });
        // console.log("bu ne typei ya :" + typeof activeid);
        this._refreshNotes();
      },
      onNoteDelete: () => {
        let id = this.activeNote.id * 1;
        // console.log("Note DELETED " + id);
        NotesAPI.deleteNote(this.activeNote.id);
        this._refreshNotes();
      },
      onReturn: (noteId) => {
        // console.log("returned to main page");
        this._refreshNotes();
      },
    };
  }
}
