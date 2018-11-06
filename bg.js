const body = document.querySelector("body");

const IMAGE_NUM = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);

}

function genRandom(){
    return Math.floor(Math.random() * IMAGE_NUM);
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();