const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors());

const PORT = 3001;
let tasks = []

app.get('/get/tasks',(req,res)=>{
        res.status(200).json({status:200,tasks:tasks});
})
app.get('/get/task',(req,res)=>{
    const id = req.body.id;
    const task = tasks.filter((task)=>{task.id==id});
    if(task!=undefined && task!=null){
        res.status(200).json({status:200,task:task,message:"found"});
    }
    else res.status(400).json({status:400,message:"Not found"})
})
app.post('/add',(req,res)=>{
    const title = req.body.title;
    console.log(title);
    const task = {
        id : Date.now(),
        title : title
    }
    tasks.push(task);
    res.status(200).json({status:200,task:task,message:"Added"});
})
app.patch('/update/:id',(req,res)=>{
    const id = req.params.id;
    const newTitle = req.body.newTitle;
    console.log("new title : "+newTitle);
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id==id){
            tasks[i].title=newTitle;
            break;
        }
    }
    res.status(200).json({status:200,tasks:tasks,message:"Updated"})
})
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    tasks = tasks.filter((task)=> task.id!=id)
    res.status(200).json({status:200,tasks:tasks,message:"Deleted"})
})
app.listen(PORT,()=>{
    console.log(`Server running on : ${PORT}`);
})