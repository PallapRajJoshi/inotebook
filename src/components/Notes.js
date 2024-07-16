import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes,getNotes } = context;
  useEffect(() => {
  getNotes();
  }, [])



  return (
    <>
      <Addnote />
      <div>
        <div className="row my-3">
          <h1> Your Notes</h1>

          {notes.map(note => (
            <Noteitem key={note._id} note={note} />


          ))}





        </div>
      </div>
    </>
  )
}

export default Notes
