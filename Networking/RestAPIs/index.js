import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json()); //Body parser middleware to parse the body of the request for all routes

const PORT = 5111;

const tasks = [{
    id: "1",
    task: "Task 1",
    completed: false
}, {
    id: "2",
    task: "Task 2", 
    completed: true
}];

app.all('/', (req, res)=>{
    // console.log("Response > ", req);
    // console.log("Request > ", res);

    res.send(`I'm up!`);

});

//READ
app.get('/todos', (req, res) => {
    res.json(tasks);
});

//CREATE   
app.post('/todos', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json({"task": task, "message": "Task added successfully"});
});

//UPDATE
app.put('/todos/:id', (req, res) => {
    const newTodoData = req.body;
    const id = req.params.id;
    const todoIndex = tasks.findIndex(todo => todo.id == id);
    if(todoIndex !== -1){
        tasks[todoIndex] = {id,...newTodoData};
        res.json({"task": newTodoData, "message": "Task updated successfully"});
    } else {
        res.status(400).json({"message": "Task not found"});
    }
});

//DELETE
app.delete('/todos/:id', (req, res)=>{
    const id = req.params.id;
    JSON.stringify(id);
    console.log("ID:", id);
    const todoIndex = tasks.findIndex(todo => todo.id === id);
    console.log("todoIndex:", todoIndex);

    if(todoIndex !== -1){
        tasks.splice(todoIndex, 1);
        res.json({"message": "Task deleted successfully"});
        console.log("Task deleted successfully");
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});