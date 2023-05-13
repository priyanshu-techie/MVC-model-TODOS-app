const taskInput=document.getElementById('newTaskInput')
const taskList=document.getElementById('taskList')

function markCompOrNot(elem){
    if(elem.classList.contains('notDone')){
        elem.classList.remove('notDone');
        elem.classList.add('completed');
    }
    else{
        elem.classList.remove('completed');
        elem.classList.add('notDone');
    }
}

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
    console.log(data);
    taskList.insertAdjacentHTML("beforeend",`
    <li class="notDone" onclick="markCompOrNot(this)"> ${val} <i class="fa-solid fa-trash"></i></li>
 `)
    taskInput.value="";
});

