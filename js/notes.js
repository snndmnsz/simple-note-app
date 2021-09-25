export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();

    const existing = notes.find((note) => note.id == noteToSave.id);

    

    // Edit/Update
    if (existing) {
      //console.log("notes icindeki  IF  statement ");
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      //console.log("notes icindeki else statement ");
      // noteToSave.id = Math.floor(Math.random() * 1000000);
      if (noteToSave.title == "" && noteToSave.body =="") {
        //console.log("empty");
        return;
      } 
      noteToSave.color =
        "hsla(" + ~~(360 * Math.random()) + "," + "70%," + "80%,1)";
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);

    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
