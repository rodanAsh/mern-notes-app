const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();

// middleware to parse json body
app.use(express.json())

// middleware for cors
app.use(cors({
    origin: "*"
}));

app.get("/", (req,res) => {
    res.json({ data: "hello" });
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
});

module.exports = app;