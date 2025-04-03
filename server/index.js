require('dotenv').config();

const connectDB = require('./db/connectDB.js')
connectDB()

const User = require('./models/user.model.js')
const Note = require('./models/note.model.js')

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities')

// middleware to parse json body
app.use(express.json())

// middleware for cors
app.use(cors({
    origin: "*"
}));

app.get("/", (req,res) => {
    res.json({ data: "hello" });
});

// Create account
app.post('/create-account', async(req,res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Fullname is required" })
    }

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" })
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Passowrd is required" })
    }

    const isUser = await User.findOne({ email: email })

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save()

    const accessToken = jwt.sign(
        { 
            user 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30m"
        }
    )

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })
})

// Login 
app.post('/login', async (req,res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" })
    }

    const userInfo = await User.findOne({ email: email })

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" })
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo }

        const accessToken = jwt.sign(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "36000m"
            }
        )

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "invalid Credentials"
        })
    }
})

// Add Note
app.post('/add-note', authenticateToken, async (req,res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Title is required" })
    }

    if (!content) {
        return res
            .status(400)
            .json({ error: true, message: "Content is required" })
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Added Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async(req,res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({
                error: true,
                message: "No Changes Provided"
            })
    } 

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note Not Found" })
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

// Get all notes
app.get("/get-all-notes", authenticateToken, async(req,res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
})

// delete note
app.delete("/delete-note/:noteId", authenticateToken, async(req,res) => {
    const noteId = req.params.noteId;
    const user = req.user;

    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id })

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" })
        }

        await Note.deleteOne({ _id: noteId, userId: user._id })

        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

// update isPinned value
app.put("/update-note-pinned/:noteId", authenticateToken, async(req,res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = re.user;

    if (!isPinned) {
        return res.status(400).json({
            error: true,
            message: "No changes provided"
        })
    }

    try {
        const note = await Note.findOne({ _id: noteId, uerId: user._id })

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note Not Found" })
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            message: "Note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
});

module.exports = app;