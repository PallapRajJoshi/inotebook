const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "Pallap";


//Route 1: Create a User using POST "/api/auth/". Doesn't require login
router.post('/createuser', [
//validation
    body('email', 'enter valid email').isEmail(),
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('password', 'enter minimum 5 character').isLength({ min: 6 }),


], async (req, res) => {
    // if there is error providing information return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    //check whether the user already exit
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with the email already exists" })
        }
        //securing password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //creating user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email

        });
        // no idea 
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);



        res.json({ authToken })
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Authenticate a User using POST "/api/auth/login". Doesn't require Auth
router.post('/login', [

    body('email', 'enter valid email').isEmail(),

    body('password', 'password can not blank').exists(),

], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email: email });
        if (!user) {
            // user not found with this email
            return res.status(400).json({ error: "try to login with correct credentials" });
        }

        const passwordCompaire = await bcrypt.compare(password, user.password);
        if (!passwordCompaire) {
            // password is not correct
            return res.status(400).json({ error: "try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get loggedin user  Useing using POST: "/api/auth/getuser".login require 

router.post('/getuser',fetchuser
    , async (req, res) => {


        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }


    });

module.exports = router