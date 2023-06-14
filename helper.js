const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];

const renderTasks = () =>{
    taskList.innerHTML=""
    axios.get('http://localhost:3001/get/tasks')
        .then((res)=>{
            const tasks=res.data.tasks;
            tasks.forEach(task=>{
                const listItem = document.createElement("li");
                listItem.className="d-flex align-items-center justify-content-center mt-3"
                listItem.innerHTML = `
                    <span class="font-20">${task.title}</span>
                    <button onclick="updateTask(${task.id})" class="btn btn-primary mx-2">Update Task</button> 
                    <button onclick="deleteTask(${task.id})" class="btn btn-danger">Delete Task</button> 
                `
                taskList.appendChild(listItem);
            })
        })
        .catch((err)=>{
            alert(err);
        })
}
const addTask = () =>{
    const title = taskInput.value
    if(title!=""){
        const task = {
            title : title
        }
        axios.post('http://localhost:3001/add',task)
            .then((res)=>{
                alert(res.data.message)
                renderTasks();
            })
            .catch((err)=>{
                alert(err);
            })
        // const listItem = document.createElement("li");
        // listItem.innerHTML = `
        //     <span>${task.text}</span>
        // `
        // taskList.appendChild(listItem);
    }
    else{
        alert("Input cannot be empty")
    }
}
const updateTask = (id) =>{
    let newTitle = prompt("Enter the updated value");
    const task={
        newTitle : newTitle
    }
    axios.patch(`http://localhost:3001/update/${id}`,task)
        .then((res)=>{
            alert(res.data.message);
            renderTasks();
        })
}
const deleteTask = (id) =>{
    axios.delete(`http://localhost:3001/delete/${id}`)
        .then((res)=>{
            alert(res.data.message)
            renderTasks();
        })
        .catch((err)=>{
            alert(err);
        })
}


renderTasks();