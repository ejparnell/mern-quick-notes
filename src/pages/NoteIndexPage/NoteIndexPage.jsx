import { useEffect, useState } from "react";
import { createNote } from "../../utilities/notes-service";

export default function NotesIndexPage({ user }) {
   const [notes, setNotes] = useState([]);
   const [newNoteText, setNewNoteText] = useState({ text: "" });

   // useEffect(() => {
   //    console.log("this is newNoteText.text", newNoteText);
   //    console.log("user in handleSubmit", user);
   // }, [newNoteText, user]);

   async function handleSubmit(event) {
      event.preventDefault();
      console.log({ user });
      const newNote = {
         text: newNoteText.text,
         user: user._id,
      };
      //here is where we connect react to the server
      const note = await createNote(newNote);
      setNotes([...notes, note]);
      // console.log("all notes that exists", notes);
      // console.log("user in handleSubmit", user);
      setNewNoteText({ text: "" });
   }

   function handleChange(event) {
      setNewNoteText({
         ...newNoteText,
         [event.target.name]: event.target.value,
      });
      console.log("nnt in handleChange", newNoteText);
   }

   return (
      <div>
         <h1>Notes</h1>
         <form onSubmit={handleSubmit}>
            <input
               name="text"
               value={newNoteText.text}
               onChange={handleChange}
            />
            <button type="submit">Add Note</button>
         </form>

         {notes.length === 0 ? (
            <p>No notes yet!</p>
         ) : (
            <ul>
               {notes.map((note, index) => (
                  <li key={index}>
                     <p>{note.text}</p>
                     <p>{note.createdAt.toLocaleString()}</p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}
