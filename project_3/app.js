// game value
let min = 1, 
    max = 10,
    winningNumber = getRandomNumber(min,max),
    guessesLeft = 3;

// ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// set ui min/max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

guessBtn.addEventListener('click',function() {
    let guess = parseInt(guessInput.value);
    
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    if(guess == winningNumber) {
       gameOver(true,`Correct the number is ${winningNumber} you win!`);
    } else {
        guessesLeft-=1;
        if(guessesLeft === 0) {
            gameOver(false,`Game over, you lost the correct number was ${winningNumber}`);
        } else {
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct you ${guessesLeft} guesses left`,'red');
            guessInput.value = '';
        }
    }

});

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessBtn.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg,color);

    guessBtn.value = 'Play Again';
    guessBtn.className += ' play-again';
}

function setMessage(msg,color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNumber(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}