const form = document.querySelector(".js-form"),
    input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

//user_LocalStorage 
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    const time = new Date().getHours();
    if (time < 12) {
        greeting.innerText = `Good morning , ${text}.`;
    } else if (time < 18) {
        greeting.innerText = `Good afternoon , ${text}.`;
    } else {
        greeting.innerText = `Good evening , ${text}.`;
    }
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    }else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();