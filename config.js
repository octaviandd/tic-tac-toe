const positions = document.querySelectorAll('.col')
const winningCombo = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]
let game_ended = false;
let player1 = 'X';
let player2 = '0';

let player1score = 0;
let player2score = 0;

let currentTurn =  1;
let movesMade = 0;

const player1NameAsk = prompt("First player's name: ").split('')
player1Name = player1NameAsk[0].toUpperCase() + player1NameAsk.slice(1).join('')
const player2NameAsk = prompt("Second player's name: ").split('');
player2Name = player2NameAsk[0].toUpperCase() + player2NameAsk.slice(1).join('')

function setPlayersNames(){
    

    document.querySelector('#player_one').innerText = player1Name;
    document.querySelector('#player_two').innerText = player2Name;
    document.querySelector('#player_one_score').innerText = player1score;
    document.querySelector('#player_two_score').innerText = player2score;
}

document.addEventListener('DOMContentLoaded', setPlayersNames)
document.querySelector('#reset').addEventListener('click', resetScore)
document.querySelector('#game').addEventListener('click', resetGame)




positions.forEach((position) =>{
    position.addEventListener('click', (e) =>{
        
        if(game_ended){
            if(confirm('Game ended. Do you want to start another game?')){
                resetGame()
            }
            return 
        }

        movesMade++;
        
        if(currentTurn === 1){
            if(e.currentTarget.innerHTML === ''){
                e.currentTarget.style.color = 'red'
                e.currentTarget.innerHTML = player1;
                currentTurn += 1;
                e.currentTarget.style.background = 'rgba(172,172,172,0.5)';
                
                
            }      
        }else{
            if(e.currentTarget.innerHTML === ''){
                e.currentTarget.style.color = 'blue'
                e.currentTarget.innerHTML = player2;
                currentTurn -= 1;
                e.currentTarget.style.background = 'rgba(76,76,76,0.8)';
                
                     
            }           
        }
                
    if(checkForWinner()){
        if(currentTurn === 2){ // X player wins
            alert(`${player1Name} won this round.`)
            player1score++
            document.querySelector('#player_one_score').innerText = player1score;
            game_ended = true
            
        }
        else{
            alert(`${player2Name} won this round.`)
            player2score++
            document.querySelector('#player_two_score').innerText = player2score
            game_ended = true
            
        }
    }

    })

    function checkForWinner(){
        if(movesMade > 4){
            let moves = Array.prototype.slice.call(positions);
            let results = moves.map((e)=>{
                return e.innerHTML})
        
        
            return winningCombo.find((combo) =>{
                if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                    return true;
                } else {
                    return false;
                }
            })
        }      
    }
})



function resetGame() {
    game_ended = false;
    currentTurn = 1;
    positions.forEach((e) =>{
        e.innerHTML = ''
        e.style.background = 'white'
    })
}
    


function resetScore(){
    player1score = 0;
    player2score = 0;
    document.querySelector('#player_one_score').innerText = player1score;
    document.querySelector('#player_two_score').innerText = player2score;
}

    
















