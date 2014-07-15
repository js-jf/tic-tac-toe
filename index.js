var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game() {
  var state,
    symbols,
    turn;

  function Game$initialize() {
    state = [];
    symbols = ['X', 'O'];
    turn = 0;
  }

  function Game$start() {
    rl.on('line', function(line){
      Game$command(line.trim());
      Game$print();
      if (Game$check()) {
        console.log("O jogador %s ganhou!", symbols[+!turn]);
        process.exit(0);
      }
      rl.setPrompt("Player " + symbols[turn] + " > ");
      rl.prompt();
    });
    Game$print();
    rl.setPrompt("Player " + symbols[turn] + " > ");
    rl.prompt();
  }

  function Game$command(command) {
    if (/^[1-9]$/.test(command) && state[--command] === undefined) {
      state[command] = turn;
      turn = +!turn;
    } else if (command === 'q') {
      process.exit(0);
    }
  }

  function Game$check() {
    var i;
    for (i = 0; i < 3; i++) {
      if ((state[i*3] !== []._ && state[i*3] === state[i*3+1] && state[i*3] === state[i*3+2]) ||
          (state[i] !== []._ && state[i] === state[i+3] && state[i] === state[i+6])) {
        return true;
      }
    }

    if (state[4] !== []._ && ((state[0] === state[4] && state[0] === state[8]) ||
        (state[2] === state[4] && state[2] === state[6]))) {
      return true;
    }
       
    return false;
  }

  function Game$print() {
    console.log(" %s | %s | %s", Game$get(0), Game$get(1), Game$get(2));
    console.log("-----------");
    console.log(" %s | %s | %s", Game$get(3), Game$get(4), Game$get(5));
    console.log("-----------");
    console.log(" %s | %s | %s", Game$get(6), Game$get(7), Game$get(8));
  }

  function Game$get(index) {
    return [symbols[state[index]]] + '' || (index + 1);
  }

  Game$initialize.apply(this, arguments);

  return {
    start: Game$start,
    get state() { return state; }
  };
}

var game = new Game();
game.start();
