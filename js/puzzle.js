var rows = 3;
var columns = 2;

var currPiec;

window.onload = function () {
  const board = document.getElementById("board");

  for (let i = 0; i < rows * columns; i++) {
    const div = document.createElement("div");
    div.dataset.image = i + 1;
    // div.setAttribute('data-id','file')
    // div.setAttribute('idd', i);
    // div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("drop", dragDrop);
    // div.addEventListener("dragend", dragEnd);
    board.appendChild(div);
  }

  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString());
  }

  pieces.reverse();

  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    //swap
    let tmp = pieces[i];
    console.log(tmp, "tmp");
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }


  for (let i = 0; i < pieces.length; i++) {
    let img = document.createElement("img");
    img.dataset.image = pieces[i];
    // img.setAttribute('data-id','file')
    img.src = "../imgs/" + pieces[i] + ".jpg";
    img.classList.add('pieceShake');

    img.setAttribute("id", pieces[i]);
    img.addEventListener("dragstart", dragStart);
    img.addEventListener("dragend", dragEnd);
    document.getElementById("pieces").appendChild(img);
  }
};

function dragStart(event) {
  console.log("drag Start", event);
  const paragraph = document.getElementById("text");
  paragraph.classList.add("hide");

  event.dataTransfer.setData("text/plain", event.target.id);
  // event.target.classList.add("ds_awaiting_file");

}

function dragOver(e) {
  console.log("drag Over", e);
  e.dataTransfer.dropEffect = "move";
  e.preventDefault();
}

function dragDrop(event) {
  console.log("drag drop", event);
  event.preventDefault();
  const droppedItemId = event.dataTransfer.getData("text/plain");
  const droppedItem = document.getElementById(droppedItemId);
 
  droppedItem.classList.remove('pieceShake');

  if (droppedItemId == event.target.dataset.image) {
    event.dataTransfer.dropEffect = "move";
    event.target.appendChild(droppedItem);

    setTimeout(() => {
      droppedItem.parentElement.innerHTML += `<img src="../imgs/thumbs_up.gif" alt="" id="goodMessage" class="goodMessage" >`;

      setTimeout(() => {
        const goodMessage = document.getElementById("goodMessage");
        if (goodMessage) {
          goodMessage.remove();
        }
      }, 1000);
    }, 0);
  }
}

function dragEnd(event) {
  console.log("drag end", event);
  event.preventDefault();

  checkPuzzleCompletion();
  // event.target.classList.remove("ds_awaiting_file");
}

function checkPuzzleCompletion() {
  const boardImages = document.querySelectorAll("#board div");
  const hasPuzzleCompleted = Array.from(boardImages).every((img) => {
    return (
      img.querySelector("img")?.getAttribute("data-image") ===
      img.getAttribute("data-image")
    );
  });

  console.log(hasPuzzleCompleted, "hasPuzzleCompleted");

  if (hasPuzzleCompleted) {
    flipAllPieces();
  }
}

function flipAllPieces() {
  const boardImages = document.querySelector(".card");
  boardImages.classList.add("card1");
}
