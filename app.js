let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // player x and player o

const winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//resetbtn
const resetgame = () => {
    turno = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}




boxes.forEach((box) => {
  box.addEventListener("click", () => {

    if (turno) {
      box.innerText = "O";
      turno = false;
    } else {
      box.innerText = "X";
      turno = true;
    }
    box.disabled = true;
  

    checwinner();
 });
}); 

const disableBoxes = () => {
   for(let box of boxes) {
    box.disabled = true;
   }
};

const enableBoxes = () => {
   for(let box of boxes) {
    box.disabled = false;
    box.innerText = "";
   }
};

const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;  // still empty boxes → not a draw
        }
    }
    return true;  // all boxes filled
};



const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    disableBoxes();
};

 
const checwinner = () => {
    let winnerFound = false;

    for (let pattern of winpatterns) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                winnerFound = true;
                return;  // stop checking after winner
            }
        }
    }

    // ⭐ If no winner, check for draw
    if (!winnerFound && checkDraw()) {
        showDraw();
    }
};

const showDraw = () => {
    msg.innerText = "Game Draw! No winner.";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};


newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
