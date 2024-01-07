document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  const restartButton = document.getElementById('restart');
  const scoreElement = document.getElementById('score');
  const gameContainer = document.querySelector('.game-container');
  let cards = [];
  let score = 0;
  let userSequence = [];
  let gameInProgress = false;

  const filePaths = [
    "file:///C://Users/mfati/OneDrive/Masaüstü/MyGithubFiles/git-fundamentals-itu-itis23-kayame22/finalTask/f2.svg",
    "file:///C://Users/mfati/OneDrive/Masaüstü/MyGithubFiles/git-fundamentals-itu-itis23-kayame22/finalTask/a2.svg",
    "file:///C://Users/mfati/OneDrive/Masaüstü/MyGithubFiles/git-fundamentals-itu-itis23-kayame22/finalTask/t2.svg",
    "file:///C://Users/mfati/OneDrive/Masaüstü/MyGithubFiles/git-fundamentals-itu-itis23-kayame22/finalTask/i2.svg",
    "file:///C://Users/mfati/OneDrive/Masaüstü/MyGithubFiles/git-fundamentals-itu-itis23-kayame22/finalTask/h2.svg"
  ];

  
  function showCard(card) {
    card.classList.remove('hide');
}

  function hideCards() {
    cards.forEach(card => {
      card.classList.add('hide');
    });
  }


  function updateBackgroundColor(score) {
    const gameContainer = document.querySelector('.game-container');
    
    if (score < 50) {
      gameContainer.style.backgroundColor = '#ffcccc'; 
    } else if (score < 100) {
      gameContainer.style.backgroundColor = '#ffffcc'; 
    } else {
      gameContainer.style.backgroundColor = '#ccffcc'; 
    }
  }

  function RandomArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function shuffleCards() {
    RandomArray(cards);
  }

  function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = index + 1;

    const img = document.createElement('img');
    img.src = filePaths[index];
    img.alt = 'Card';

    card.appendChild(img);
    return card;
  }

  function createCards() {
    for (let i = 0; i < filePaths.length; i++) {
      const card = createCard(i);
      cards.push(card);
    }
    shuffleCards();
    
  }

  

  function updateDisplayOrder() {
    gameContainer.innerHTML = ''; 
    
    cards.forEach(card => {
      gameContainer.appendChild(card);
    });
  }

  
   

  function startGame() {
    if (!gameInProgress) {
      gameInProgress = true;
      score = 0; 
      userSequence = [];
      scoreElement.textContent = score;
      cards = []; 
      createCards();
      setTimeout(hideCards, 2000);
      updateDisplayOrder();
    } else {
      alert('Press restart button');
    }
  }

  function restartGame() {
    gameInProgress = false;
    score = 0;
    userSequence = [];
    scoreElement.textContent = score;
    cards = [];
    
    
    startGame();
  }

  function Click(event) {
    if (gameInProgress) {
      const selectedCard = event.target.closest('.card');
      if (selectedCard) {
        const cardValue = parseInt(selectedCard.dataset.value);
        if (cardValue === userSequence.length + 1) {
          userSequence.push(cardValue);
          score += 20;
          scoreElement.textContent = score;
          updateBackgroundColor(score);
  
          
          showCard(selectedCard);
          
          
          if (userSequence.length === filePaths.length) {
            alert('You Win! Score: ' + score);
            
          }
        } else {
          alert('Game Over! Score: ' + score);
          
        }
      }
    }
  }

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', restartGame);
  gameContainer.addEventListener('click', Click);
});
