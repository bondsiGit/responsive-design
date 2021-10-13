class SuitGame {
  
  constructor() {
    let thisGame = this;

    this.com = new CompPlayer(() => thisGame.compare());
    this.human = new HumanPlayer(this.com);
    this.result = document.getElementById('result');
    this.refreshButton = document.getElementById('refresh');
    
    this.registerRefreshButton();
  }
  
  compare() {
    let thisGame = this;
    if (thisGame.human.suit === thisGame.com.suit) thisGame.draw();
    else if (thisGame.human.suit === 'batu') (thisGame.com.suit === 'kertas') ? thisGame.lose() : thisGame.win() ;
    else if (thisGame.human.suit === 'kertas') (thisGame.com.suit === 'gunting') ? thisGame.lose() : thisGame.win() ;
    else if (thisGame.human.suit === 'gunting') (thisGame.com.suit === 'batu') ? thisGame.lose() : thisGame.win() ;
  }
  
  win() {
    const p = document.getElementById('p');
    this.result.classList.add('winBox');
    p.setAttribute("style", "font-size: 1.5em; color: white;");
    p.innerText = "Player 1 WIN";
    console.log("Player 1 WIN");
  }

  lose() {
    const p = document.getElementById('p');
    this.result.classList.add('loseBox');
    p.setAttribute("style","font-size: 1.5em; color: white");
    p.innerText = "COM WIN";
    console.log("COM WIN");
  }

  draw() {
    const p = document.getElementById('p');
    this.result.classList.add('drawBox');
    p.setAttribute("style", "font-size: 1.9em; color: white");
    p.innerText = "DRAW";
    console.log("DRAW");
  }

  registerRefreshButton() {
    var theGame = this;

    this.refreshButton.addEventListener('click', function() {
      theGame.resetAll();
    });
  }

  resetAll() {
    this.com.resetSuit();
    this.human.resetSuit();
    
    this.result.classList.remove('winBox');
    this.result.classList.remove('loseBox');
    this.result.classList.remove('drawBox');
    
    document.getElementById('p').innerText = 'VS';
    document.getElementById('p').setAttribute('style', "font-size: 144px; color: #BD0000; font-weight: bold;");
  }

}

class Player {

  constructor(batu, kertas, gunting, nextPlayer) {
    this.bet = null;
    this.nextPlayer = nextPlayer;

    this.batu = document.getElementById(batu);
    this.kertas = document.getElementById(kertas);
    this.gunting = document.getElementById(gunting);
  }

  get suit() {
    return this.bet;
  }

  resetSuit() {
    this.bet = null;

    this.batu.classList.remove('selected-suit');
    this.kertas.classList.remove('selected-suit');
    this.gunting.classList.remove('selected-suit');
  }

  turn() {}

  choose() {}
  
  next() {
    this.nextPlayer.turn ? this.nextPlayer.turn() : this.nextPlayer();
  }
}

class HumanPlayer extends Player {

  constructor(nextPlayer) {
    super('batu-pHuman', 'kertas-pHuman', 'gunting-pHuman', nextPlayer);
    let currentPlayer = this;
    
    this.batu.addEventListener('click', function() {
      currentPlayer.bet = 'batu';
      this.classList.toggle('selected-suit');
      console.log('batu');
      currentPlayer.next();
    });

    this.kertas.addEventListener('click', function() {
      currentPlayer.bet = 'kertas';
      this.classList.toggle('selected-suit');
      console.log('kertas');
      currentPlayer.next();
    });

    this.gunting.addEventListener('click', function() {
      currentPlayer.bet = 'gunting';
      this.classList.toggle('selected-suit');
      console.log('gunting');
      currentPlayer.next();
    });
  }

}

class CompPlayer extends Player {
  
  constructor(nextPlayer) {
    super('batu-pComp', 'kertas-pComp', 'gunting-pComp', nextPlayer);
  }

  turn() {
    let options = ['batu', 'kertas', 'gunting'];
    this.bet = options[Math.floor(Math.random()*options.length)];
    console.log(this.bet);
    this.choose();
  }

  choose() {
    if (this.bet === 'batu') {
      this.batu.classList.toggle('selected-suit');
    } else if (this.bet === 'kertas') {
      this.kertas.classList.toggle('selected-suit');
    } else {
      this.gunting.classList.toggle('selected-suit');
    }
  
    this.next();
  }
  
}

let game = new SuitGame();