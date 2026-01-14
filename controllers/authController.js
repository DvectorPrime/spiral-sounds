import validator from "validator"
import { getDBConnection } from "../db/db.js"

export async function authController(req, res) {
    const db = await getDBConnection()
    let {name, email, username, password} = req.body

    if((name === "") || (email === "")  || (username === "") || (password === "")){
        return res.status(422).json({error : "All fields are required"})
    }

    name = name.trim()
    email = email.trim()
    username = username.toLowerCase().trim()

    const userNameRegex = /^[a-zA-Z0-9_-]{1,20}$/

    if (!userNameRegex.test(username)) {
        return res.status(422).json({error : "Invalid Username"})
    }

    if (!validator.isEmail(email)){
        return res.status(422).json({error : "Invalid Email Address"})
    }

    try {
        
        const existing = await db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email])

        if (existing){
            return res.status(400).json({error : "User already exists"})
        } else {
            const results = await db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, password])

            return res.status(201).json({success : "Your registration was successful"})
        }

    } catch (err){
        res.status(500).json({error : "Could not process your sign up request"})
    }
}