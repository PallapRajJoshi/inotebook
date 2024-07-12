
const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
//Route 1:Get all the notes of User using POST "/api/note/fetchallnotes". Doesn't require login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {


        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route 2:Add a new note  using POST "/api/note/addnote". Doesn't require login
router.post('/addnote', fetchuser, [

    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {


        const { title, description, tag } = req.body;
        //if there are errors return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id

        })

        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// 52 watching


//Route 3:Update note  using put "/api/note/updatenote". Doesn't require login

router.put('/updatenote/:id', fetchuser, fetchuser, [

    // body('title', 'enter a valid title').isLength({ min: 3 }),
    // body('description', 'description must be 5 character').isLength({ min: 5 }),
], async (req, res) => {

    const { title, description, tag } = req.body;
    try {


        //create newNote object
        const newNote = {};

        if (title) { newNote.title = title };

        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated 
        let note = await Note.findById(req.params.id);
        if (!note) {

          return  res.status(404).send("note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})




//Route 4:Delete note  using delete "/api/note/delerteenote". Doesn't require login

router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
       
        try {
            let note = await Note.findById(req.params.id);

            //find the note to be deleted and deleted 
          
            
           
            if (!note) {

              return  res.status(404).send("note not found");
            }
       
            //allowed deleted only if user own this note

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }

            await Note.findByIdAndDelete(req.params.id);
            res.json({ "Success": "note has been deleted"});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })

module.exports = router