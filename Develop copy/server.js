
//require packages
const express = require('express');
const path = require("path")
const data = require("./db/db.json")
const fs = require('fs')

const app = express();

// middlewares
app.use(express.static("public"));
//allows ourt server to understand the req.body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    res.json(data)
})

//receives the data from the server and sends it to the db.json
app.post("/api/notes", (req, res) => {
    console.log(req.body)

//push the contents of req.body
    data.push(req.body);
//write the data to file after being stingified
    fs.writeFile("./db/db.json", JSON.stringify(data), () => {
        
        res.send("successfully added!")
    })

})



app.listen(3001, () => {
    console.log("Server is running")
})