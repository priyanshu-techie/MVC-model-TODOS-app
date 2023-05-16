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
    <li data-id=${data.idOfTask}>
        <span class="notDone" onclick="markCompOrNot(this)"> ${val} </span>
        <i class="fa-regular fa-square"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
    </li>
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

        // changing the check mark
        let checkMark=elem.parentNode.childNodes[3];
        checkMark.classList.remove('fa-square');
        checkMark.classList.add('fa-square-check');

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

        // changing the checkmark
        let checkMark=elem.parentNode.childNodes[3];
        checkMark.classList.remove('fa-square-check');
        checkMark.classList.add('fa-square');

        fetch('/todos/markIncomplete',{
            method:'put',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({taskId:taskId})
        }).catch(e=>{console.log(e)})
    }
}



