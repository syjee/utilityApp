const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const toDos = [];

function saveToDos(){
    //convert JS to JSON
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}


function paintToDo(text){
    const li = document.createElement("li");
    
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = text;

    const newId = toDos.length +1;

    li.appendChild(span);
    li.append(delBtn);

    toDoList.appendChild(li);

    const todoObject = {
        text: text,
        id: newId
    };

    toDos.push(todoObject);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    
    toDoInput.value = "";
    
}

function askForToDo(){
    toDoForm.classList.add(SHOWING_CN);
    toDoForm.addEventListener("submit",handleSubmit);
}

function updateToDo(toDo){
    paintToDo(toDo);
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    askForToDo();

    if(loadedToDos !== null){
        //convert JSON String to Object
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(element => {
            updateToDo(element.text);
        });
    }
}

function init() {
    loadToDos();
}

init();