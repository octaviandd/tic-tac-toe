

const btnResetScore = document.querySelector('#reset');
const btnResetGame = document.querySelector('#game');
const squares = document.querySelectorAll('.col');
let player1Score = document.querySelector('#one_score')
let player2Score = document.querySelector('#two_score')
const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
const startGame = document.querySelector('#start')
const xNameInput = document.querySelector('#x_input');
const oNameInput = document.querySelector('#o_input');
const modal = document.querySelector('.modal')

let xColorSquare = []
let oColorSquare = []
let makeMoves = 0;
let xChoices = []
let oChoices = []
player1Score = 0
player2Score = 0
let currentPlayer = 0;
game_ended = false



var typed = new Typed('#typed-string', {
    strings: ["Tic Tac Toe"],
    typeSpeed: 80,
    loop: true,
    backSpeed: 80,
    
  });







startGame.addEventListener('click', function(){
    if(xNameInput.value == '' || oNameInput.value == ''){
        alert('You need to insert a name !')
    }

    else{
        player_one.innerText = xNameInput.value.toUpperCase() + " (X)";
        player_two.innerText = oNameInput.value.toUpperCase() + " (0)";
        modal.classList.add('active')
    }

})


const Gameboard = (function(){

    const clearBoard = () =>{
        squares.forEach(square =>{
            square.innerText = ''
        })
    }

    const restartGame = () =>{
        game_ended = false;
        currentPlayer = 0;
        squares.forEach((e) =>{
            e.innerText = ''
            e.style.backgroundColor = '';
        })
        xChoices = []
        oChoices = []
    }

    const resetScore = () =>{
        player1Score = 0;
        player2Score = 0;
        document.querySelector('#one_score').innerText = player1Score;
        document.querySelector('#two_score').innerText = player2Score;
    }

    


    return {clearBoard,restartGame,resetScore}


})()


const Winner = (function(){

    const checkForXWinner = () =>{
        return winningCombos.some(combo =>{
            return combo.every(e =>{
                return xChoices.includes(e)
            })
        })
    }
    
    const checkForOWinner = () =>{
        return winningCombos.some(combo =>{
            return combo.every(e =>{
                return oChoices.includes(e)
            })
        })
    }

    const getXColor = () =>{
    const winArrayIndex = winningCombos
            .map(arr => arr.every(y => xChoices.includes(y)))
            .findIndex(x => x)
    for (let i = 0; i < winningCombos[winArrayIndex].length; i++) {
            xColorSquare.push(winningCombos[winArrayIndex][i])
          }
        return xColorSquare
    }

    const getOColor = () =>{
        const winArrayIndex = winningCombos
                .map(arr => arr.every(y => oChoices.includes(y)))
                .findIndex(x => x)
        for (let i = 0; i < winningCombos[winArrayIndex].length; i++) {
                oColorSquare.push(winningCombos[winArrayIndex][i])
              }
            return oColorSquare
        }


     

    return {checkForXWinner, checkForOWinner,getXColor, getOColor}

})()


squares.forEach(square =>{
    square.addEventListener('click', function(e){
        
    if(game_ended){
        if(confirm('Game ended. Do you want to start another game?')){
            Gameboard.restartGame()
        }
        return 
    }
    
    
    
    makeMoves++

    if(currentPlayer == 0 && square.innerText === ''){
            square.innerText = 'X'
            xChoices.push(Number(square.id.replace(/c/g, ''))) 
            currentPlayer++
        
        }
    else if(currentPlayer == 1 && square.innerText === ''){
            square.innerText = 'O';
            oChoices.push(Number(square.id.replace(/c/g, '')))
            currentPlayer--

    }
    
    if(Winner.checkForOWinner()){
        game_ended = true;
        player2Score++
        document.querySelector('#two_score').innerText = player2Score;
        let combo = Winner.getOColor();
        combo.forEach(i => document.querySelector('#c'+i).style.backgroundColor = '#28A744');
        makeMoves = 0
        
        
    }
    if(Winner.checkForXWinner()){
        game_ended = true;
        player1Score++     
        document.querySelector('#one_score').innerText = player1Score;
        let combo = Winner.getXColor();
        combo.forEach(i => document.querySelector('#c'+i).style.backgroundColor = '#28A744');
        makeMoves = 0;
        }
    

    if(makeMoves === 9 && Winner.checkForOWinner() === false && Winner.checkForXWinner() === false){
        setTimeout(function(){
            alert(`It's a draw !`)
            makeMoves = 0;
            
        }, 600)
        setTimeout(function(){
            Gameboard.restartGame();
        }, 500)
    }
    
    
    }) 
}) 


btnResetGame.addEventListener('click', Gameboard.restartGame)
btnResetScore.addEventListener('click', Gameboard.resetScore)






