//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //dom load event

    document.addEventListener('DOMContentLoaded',getTasks);
    
    // Add task event
    form.addEventListener('submit',addTask); 
    
    //remove task event
    taskList.addEventListener('click',removeTask);

    //clear task event
    clearBtn.addEventListener('click',clearTasks);

    //filter task event
    filter.addEventListener('keyup',filterTasks);
}

// get tasks from ls

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        
        // Create new link element
        const link = document.createElement('A');
        link.className = 'delete-item secondary-content';
    
        // Add icon html
        link.innerHTML = '<i class ="fa fa-remove"></i>';
        
        // apend to li
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if(taskInput.value === ''){
        alert("Add a task");
    }

    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create new link element
    const link = document.createElement('A');
    link.className = 'delete-item secondary-content';
   
    // Add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    
    // apend to li
    li.appendChild(link);
    taskList.appendChild(li);

    //store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    //clear task value
    taskInput.value = '';
    e.preventDefault();
}

//store Task

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
       if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
    }
}

//remove from ls 

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}