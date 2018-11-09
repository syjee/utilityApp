const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const deleteBtn = document.querySelector(".delete_btn");

const TODOS_LS = "toDos";
let toDos = [];

function filterFn(toDo,id){
    return toDo.id ===id;
}

function deleteToDo(event){
    const img = event.target;
    const btn = img.parentNode;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(element){
        return element.id !== parseInt(li.id);
    });
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    //convert JS to JSON
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function checked(event){
    const li = event.target.parentNode.parentNode;
    toDos.filter(function(element){
        if(element.id === parseInt(li.id)){
            element.isChecked = !element.isChecked;
            if(element.isChecked) event.target.src = `./images/full-heart.png`;
            else event.target.src = `./images/empty-heart.png`;
        }
    });

    saveToDos();
    /*
    checked[0].isChecked = !checked[0].isChecked;
    if(li.isChecked){
        event.target.src = `./images/full-heart.png`;
    }else{
        event.target.src = `./images/empty-heart.png`;
    }
    */
}

function paintToDo(text, isChecked){
    if(toDos.length > 5){
        alert("overflow");
        return;
    }
    const li = document.createElement("li");
    
    const delBtn = document.createElement("button");
    
    const img = new Image();
    img.src = `./images/trash_can.png`;
    img.classList.add("delete_btn");
    delBtn.appendChild(img);
    delBtn.addEventListener("click",deleteToDo);

    const checkBtn = document.createElement("button");

    const heart = new Image();
    
    if(isChecked) heart.src = `./images/full-heart.png`;  
    else heart.src = `./images/empty-heart.png`;
    
    heart.classList.add("check_btn");
    checkBtn.appendChild(heart);
    checkBtn.addEventListener("click",checked);
    

    const span = document.createElement("span");
    span.innerText = text;

    const newId = toDos.length +1;

    li.append(checkBtn);
    li.appendChild(span);
    li.append(delBtn);
    li.id = newId;
    li.isChecked = isChecked;

    toDoList.appendChild(li);

    const todoObject = {
        text: text,
        id: newId,
        isChecked : isChecked
    };

    toDos.push(todoObject);
    saveToDos();

}


function handleSubmit(event){
    event.preventDefault();
    
    const currentValue = toDoInput.value;
    if(currentValue === null || currentValue === ""){
        console.log("You should write anything");
        return;
    }
    paintToDo(currentValue,false);
    
    toDoInput.value = "";
    
}

function askForToDo(){
    toDoForm.classList.add(SHOWING_CN);
    toDoForm.addEventListener("submit",handleSubmit);
}

function updateToDo(toDo, isChecked){
    paintToDo(toDo, isChecked);
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    askForToDo();

    if(loadedToDos !== null){
        //convert JSON String to Object
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(element => {
            updateToDo(element.text, element.isChecked);
        });
    }
}

function init() {
    loadToDos();
}

init();