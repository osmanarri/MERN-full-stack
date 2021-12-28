const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
//import Todo model from Todo.js
const Todo = require("./models/Todo");

const app = express();

// allows you to use content of type json
app.use(express.json());

// cors will stop any cros origin errors
app.use(cors());

// connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {useNewUrlParser : true})
.then(() => console.log("Connected to mongoDB"))
.catch(console.error);

//-------------------- Routes -------------------------
// get (read) request
app.get("/todos", async(req, res) => {

    // read all documents
    const todos = await Todo.find();

    res.json(todos);
});

// post (create) request
app.post("/todo/new", (req, res) => {

    // create a new document (row)
    const todo =  new Todo({
        text: req.body.text
    });
    // save the new document
    todo.save();
    // parse it to json, so we can add it to the list
    res.json(todo);
});


// delete request
app.delete("/todo/delete/:id", async (req, res) => {

    // delete a document by ID
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json({result});
})

// 
app.get("/todo/complete/:id", async (req, res) => {

    // store the selected list by id
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

// put (update) request
app.put("/todo/update/:id", async (req, res) => {

    // store the selected list by id
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;

    todo.save();

    res.json(todo);
})


//------------------------- End of Routes -------------------------------



// listen to a port 
app.listen(3001, () => console.log("Server started on port 3001."));


