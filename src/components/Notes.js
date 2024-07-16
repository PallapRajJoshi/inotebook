import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const [note, setNote] = useState({ etitle: '', edescription: '', etag: '' })
  const handleClick = (e) => {
    console.log("updating the note",e)
    e.preventDefault();
   
  }




  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }




  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title,etag:currentNote.tag,edescription:currentNote.description})
  }

  return (
    <>
      <Addnote />


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>

                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                </div>






              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>















      <div>
        <div className="row my-3">
          <h1> Your Notes</h1>

          {notes.map(note => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />


          ))}





        </div>
      </div>
    </>
  )
}

export default Notes
