const taskInput=document.getElementById('newTaskInput');
const taskList=document.getElementById('taskList');
const form = document.querySelector('form');
form.addEventListener('submit',async function (e){
    e.preventDefault();
    
    const val=taskInput.value;
    const res=await fetch('/todos/addNewTask',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({newTask:val})
    })
    const data=await res.json();
    console.log(data.message);
    taskList.insertAdjacentHTML("beforeend",`
    <li data-id=${data.idOfTask}><span class="notDone" onclick="markCompOrNot(this)"> ${val} </span><i class="fa-solid fa-trash" onclick="deleteTask(this)"></i></li>
 `)
    taskInput.value="";
});


async function deleteTask(elem){
    let idOfTask=elem.parentNode.dataset.id;
    try{
        let resp=await fetch('/todos/deleteTask',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idFromLiTag:idOfTask
            })
        })
        let data=await resp.json();
        console.log(data);
        elem.parentNode.remove();
    }
    catch(e){
        console.log(e);
    }

}

function markCompOrNot(elem){
    let taskId=elem.parentNode.dataset.id;
    if(elem.classList.contains('notDone')){
        elem.classList.remove('notDone');
        elem.classList.add('completed');
        fetch('/todos/markComplete',{
            method:'put',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({taskId:taskId})
        }).catch(e=>{console.log(e)})
    }
    else{
        elem.classList.remove('completed');
        elem.classList.add('notDone');
        fetch('/todos/markIncomplete',{
            method:'put',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({taskId:taskId})
        }).catch(e=>{console.log(e)})
    }
}



