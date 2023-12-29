let div1 = document.querySelector(".div1");
let msg = document.querySelector(".msg");
let container = document.querySelector(".container");
let div2 = document.querySelector(".div2");
let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector("#new");
let reset = document.querySelector("#reset");

let pattern0 = true;
let count = 0;

const winingPatterns = [[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8]];

const resetGame = () =>{
    pattern0 = true;
    count = 0;
    enableBoxes();
    msg.classList.add("hide");
    newGame.classList.add("hide");
    container.classList.remove("hide");
    div2.classList.remove("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(pattern0){
            box.innerText = "0";
            pattern0 = false;
        }else{
            box.innerText = "X";
            pattern0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
});

const gameDraw = () =>{
    msg.innerText = "Game Draw, start a new game";
    msg.classList.remove("hide");
    newGame.classList.remove("hide");
    container.classList.add("hide");
    div2.classList.add("hide");
}

const showWinner = (winner) =>{
    msg.innerText =`Congratulation, winner is ${winner}`;
    msg.classList.remove("hide");
    newGame.classList.remove("hide");
    container.classList.add("hide");
    div2.classList.add("hide");
    disableBoxes();
}

const checkWinner = ()=>{
    for(let pattern of winingPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
}
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);