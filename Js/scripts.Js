let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('#buttons-container button');
let aiButton = document.querySelector('#ai-players');
let p2Button = document.querySelector('#players');
let messageContainer = document.querySelector('#message');
let messageText = document.querySelector('#message p');
let secondPlayer = 'human';
let games = 0;
p2Button.style.backgroundColor = 'blue';
p2Button.style.color = 'white';

// contador de jogadas
let player1 = 0;
let player2 = 0;

// adicionando o evento de click aos boxes
for (let i = 0; i < boxes.length; i++) {
  // quando alguem clica na caixa
  boxes[i].addEventListener('click', function () {
    let el = checkEl(player1, player2);

    // verificar se ja tem x ou bola
    if (this.childNodes.length == 0) {
      let cloneEl = el.cloneNode(true);

      this.appendChild(cloneEl);

      // computar jogada
      if (player1 == player2) {
        player1++;
      } else {
        player2++;
      }
      let check = checkWinCondition();

      if (secondPlayer === 'ai' && !check) {
        el = checkEl(player1, player2);
        player2++;
        let dec = aiDecision();
        let cloneEl = el.cloneNode(true);
        dec.appendChild(cloneEl);
        check = checkWinCondition();
      }

      // checar quem venceu
    }
  });
}

// ver quem vai jogar
function checkEl(player1, player2) {
  if (player1 == player2) {
    // x
    el = x;
  } else {
    // o
    el = o;
  }
  return el;
}

function checkBoxes(box1, box2, box3) {
  if (
    box1.childNodes.length > 0 &&
    box2.childNodes.length > 0 &&
    box3.childNodes.length > 0
  ) {
    let b1 = box1.childNodes[0].className;
    let b2 = box2.childNodes[0].className;
    let b3 = box3.childNodes[0].className;

    if (b1 == 'x' && b2 == 'x' && b3 == 'x') {
      // x
      return 'x';
    } else if (b1 == 'o' && b2 == 'o' && b3 == 'o') {
      // o
      return 'o';
    }
  }
  return '';
}
// ve quem ganhou
function checkWinCondition() {
  let b1 = document.getElementById('block-1');
  let b2 = document.getElementById('block-2');
  let b3 = document.getElementById('block-3');
  let b4 = document.getElementById('block-4');
  let b5 = document.getElementById('block-5');
  let b6 = document.getElementById('block-6');
  let b7 = document.getElementById('block-7');
  let b8 = document.getElementById('block-8');
  let b9 = document.getElementById('block-9');
  let check = '';

  // horizontal
  check = checkBoxes(b1, b2, b3);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  check = checkBoxes(b4, b5, b6);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  check = checkBoxes(b7, b8, b9);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  // vertical
  check = checkBoxes(b1, b4, b7);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  check = checkBoxes(b2, b5, b8);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  check = checkBoxes(b3, b6, b9);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  // diagonal
  check = checkBoxes(b1, b5, b9);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  check = checkBoxes(b3, b5, b7);
  if (check != '') {
    declareWinner(check);
    return true;
  }

  // deu velha
  let counter = 0;

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].childNodes[0] != undefined) {
      counter++;
    }
  }

  if (counter === 9) {
    declareWinner('');
    return true;
  }
  return false;
}

// limpar o jogo,   declara o vencedor e atualiza o placar
function declareWinner(winner) {
  games++;
  let scoreboardX = document.querySelector('#scoreboard-1');
  let scoreboardY = document.querySelector('#scoreboard-2');
  let msg = '';

  if (winner == 'x') {
    scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
    msg = 'O jogador 1 venceu!';
  } else if (winner == 'o') {
    scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
    msg = 'O jogador 2 venceu!';
  } else {
    msg = 'Deu velha!';
  }

  // exibir msg
  messageText.innerHTML = msg;
  messageContainer.classList.remove('hide');

  // esconder menssagem
  setTimeout(function () {
    messageContainer.classList.add('hide');
    player1 = 0;
    player2 = 0;
    boxes.forEach(function (box) {
      const boxChildren = box.getElementsByTagName('div');
      if (boxChildren.length > 0) {
        box.removeChild(boxChildren[0]);
      }
    });
    if (secondPlayer === 'ai' && games % 2 === 1) {
      let dec = aiDecision();
      let el = o.cloneNode(true);
      let cloneEl = el.cloneNode(true);
      dec.appendChild(cloneEl);
    }
  }, 3000);
}

function aiDecision() {
  let emptyBoxes = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].childNodes.length == 0) {
      emptyBoxes.push(boxes[i]);
    }
  }
  const randomBox = Math.floor(Math.random() * emptyBoxes.length);
  return emptyBoxes[randomBox];
}

aiButton.addEventListener('click', function () {
  if (secondPlayer === 'human') {
    aiButton.style.backgroundColor = 'blue';
    aiButton.style.color = 'white';

    p2Button.style.backgroundColor = '';
    p2Button.style.color = '';
    secondPlayer = 'ai';
    player1 = 0;
    player2 = 0;
    boxes.forEach(function (box) {
      const boxChildren = box.getElementsByTagName('div');
      if (boxChildren.length > 0) {
        box.removeChild(boxChildren[0]);
      }
    });
  }
});

p2Button.addEventListener('click', function () {
  if (secondPlayer === 'ai') {
    p2Button.style.backgroundColor = 'blue';
    p2Button.style.color = 'white';

    aiButton.style.backgroundColor = '';
    aiButton.style.color = '';
    secondPlayer = 'human';
    player1 = 0;
    player2 = 0;
    boxes.forEach(function (box) {
      const boxChildren = box.getElementsByTagName('div');
      if (boxChildren.length > 0) {
        box.removeChild(boxChildren[0]);
      }
    });
  }
});
