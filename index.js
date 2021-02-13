let main = document.getElementById("main");
let gameActive = true;
let id = 1;
for(var i=1; i<=81; i++){
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.id = `cell_${id}`;
    id++;
    main.appendChild(gridItem);
}

//Generating 10 random places for bombs

window.random = [];
function bombs(){
    while(random.length < 10){
        let randomNum = Math.floor(Math.random() * 81) + 1;
        if(random.indexOf(randomNum) === -1){
            random.push(randomNum);
        }
    }
}

bombs(); //initial placement

let SafeArray = [];
let points = 0;
let messageDisplay = document.getElementById("resultDisplay");
let score = document.getElementById("score");

//function for displaying result

function displayResult(result){
    if(result == 0){
        messageDisplay.innerText = "Game Over";
        gameActive = false;
    }
    else if(result == 71){
        score.innerText = result;
        messageDisplay.innerText = "You Win";
        gameActive = false;
    }
    else{
        score.innerText = result;
    }
}


//after every click do this
function handleEvent(clickedEvent){
    if(!gameActive){
        return;
    }

    const clickedCell = clickedEvent.target;
    const id = parseInt(clickedCell.getAttribute("id").substring(5));

    if(random.includes(id)){
        for(let i=0; i<random.length; i++){
            let bombElem = document.getElementById(`cell_${random[i]}`);
            bombElem.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
            bombElem.style.backgroundColor = "red";
            displayResult(0);
        }
    }
    else{
        //condition to check if the cell is already clicked or not
        if(!SafeArray.includes(id)) {
            SafeArray.push(id);
            clickedCell.style.backgroundColor = "green";
            points++;
            displayResult(points);
        }
    }
}

let cellArray = document.querySelectorAll(".grid-item");

//function to restart game

function reset(){
    gameActive = true;
    SafeArray = [];
    points = 0;
    score.innerText = 0;
    messageDisplay.innerText = "";
    cellArray.forEach((cell) => cell.style.backgroundColor = "white");

    for(let i=0;i<random.length;i++){
        let bombElem = document.getElementById(`cell_${random[i]}`);
        bombElem.style.backgroundImage = "none";
    }

    random = [];
    bombs();
}

document.querySelectorAll(".grid-item").forEach((cell) => cell.addEventListener("click", handleEvent));
















// for(var i=0;i<9;i++){
//     var row = document.createElement("div");
//     row.className = "row";
//     for(var j=1;j<=9;j++){
//         var cell = document.createElement("div");
//         cell.className = "col";
       
//         row.appendChild(cell);
//     }
//     main.appendChild(row);
//     // const column = document.getElementsByClassName("col");
    
// }

// document.querySelectorAll(".col").forEach(item => {
//     item.addEventListener("click" , event =>{
//         this.style.color = "red";
//     })
// });