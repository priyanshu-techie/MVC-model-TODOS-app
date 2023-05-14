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
    <li class="notDone" data-id=${data.idOfTask} onclick="markCompOrNot(this)"> ${val} <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i></li>
 `)
    taskInput.value="";
});


function deleteTask(elem){
    let idOfTask=elem.parentNode.dataset.id;
    elem.parentNode.remove();

    fetch('/todos/deleteTask',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            idFromLiTag:idOfTask
        })
    }).then(res=>res.json()).then(d=>console.log(d)).catch(e=>console.error(e));

}

function markCompOrNot(elem){
    let taskId=elem.dataset.id;
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



