import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5555"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)



 //get all  notes
 const getNotes = async () => {
  

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmJlYmIzZGEyNTM2MjVlNzIxMzIxIn0sImlhdCI6MTcyMDc2MjU5OX0.HO1VKKZGBj6usP1TFS6SVe3wmJwgklmoi54FbTKwqF8'

    },
   
  });
const json=await response.json();
console.log(json)
setNotes(json);
}






  //Add a note
  const addNote = async (title, description, tag) => {
    //to do api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmJlYmIzZGEyNTM2MjVlNzIxMzIxIn0sImlhdCI6MTcyMDc2MjU5OX0.HO1VKKZGBj6usP1TFS6SVe3wmJwgklmoi54FbTKwqF8'

      },
      body: JSON.stringify({title,description,tag})
    });

const json=response.json();




    console.log("adding a new note")
    const newNote = {
      "_id": "6690d5728bc497396be7c986",
      "user": "668fbebb3da253625e721321",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-07-12T07:04:18.607Z",
      "__v": 0
    };
    setNotes(notes.concat(newNote))
  }

  //Delete a note

  const deleteNote = (id) => {

    const newNotes = notes.filter((note) => {

      return note._id !== id;
    })
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZmJlYmIzZGEyNTM2MjVlNzIxMzIxIn0sImlhdCI6MTcyMDc2MjU5OX0.HO1VKKZGBj6usP1TFS6SVe3wmJwgklmoi54FbTKwqF8'

      },
      body: JSON.stringify({title,description,tag})
    });

const json=response.json();

    //logic to edit in client 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>


      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;