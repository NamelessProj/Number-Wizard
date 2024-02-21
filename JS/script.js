let userGuess = 0,
    numberToGuess = 0,
    userTry = 0,
    minValueDefault = 1,
    maxValueDefault = 10,
    buttonMakeAGuess = document.getElementById('sendGuess'),
    userInput = document.getElementById('numGuess'),
    statsStepSpan = document.querySelector('#stats span'),
    guessResultSpan = document.querySelector('#guessResult p'),
    newGameButton = document.getElementById('newGame'),
    minValueInput = document.getElementById('minValue'),
    maxValueInput = document.getElementById('maxValue');

newGameButton.setAttribute('disabled', '');

function generateNumber(min = minValueDefault, max = maxValueDefault){
    if(min >= max || isNaN(min) || isNaN(max)){
        alert("Make sure that the min is lower than the max and that they're both numbers!");
        return false;
    }

    let number = Math.floor(Math.random() * (max - min + 1) + min);

    return number;
}

function makeAGuess(guess){
    let msg = '';
    userTry++;

    if(guess === numberToGuess){
        msg = "You won!";
        newGameButton.removeAttribute('disabled');
        buttonMakeAGuess.setAttribute('disabled', '');
        if(userTry === 1){
            msg += " But... how have even been able to win this fast?!";
        }else{
            msg += ` It tooks you ${userTry} turn to get the number.`;
        }
    }else if(guess > numberToGuess){
        msg = "The number is lower.";
    }else{
        msg = "The number is higher.";
    }

    statsStepSpan.innerText = userTry;
    guessResultSpan.innerText = msg;
}

function changeMinAndMaxValue(){
    let newMin = Number(minValueInput.value),
        newMax = Number(maxValueInput.value);

    if(newMin >= newMax || isNaN(newMin) || isNaN(newMax) || newMin === 0){
        minValueInput.value = minValueDefault;
        maxValueInput.value = maxValueDefault;
        alert("Make sure that the min is lower and different than the max and that they're both numbers higher than 0!");
        return false;
    }

    minValueDefault = minValueInput.value;
    maxValueDefault = maxValueInput.value;

    guessResultSpan.innerText = '';
    statsStepSpan.innerText = 0;
    numberToGuess = generateNumber(newMin, newMax);
    userInput.value = minValueDefault;
}

numberToGuess = generateNumber();

buttonMakeAGuess.addEventListener('click', () => {
    userGuess = Number(userInput.value);

    if(isNaN(userGuess) || userGuess === 0){
        alert("Please, enter a number.");
        return false;
    }

    if(userGuess < minValueDefault || userGuess > maxValueDefault){
        alert(`Please, make sure that your number is between ${minValueDefault} and ${maxValueDefault}.`);
        return false;
    }

    makeAGuess(userGuess);
});

newGameButton.addEventListener('click', () => {
    guessResultSpan.innerText = "Charging a new game...";
    newGameButton.setAttribute('disabled', '');
    buttonMakeAGuess.setAttribute('disabled', '');

    setTimeout(() => {
        numberToGuess = generateNumber(minValueDefault, maxValueDefault);
        guessResultSpan.innerText = '';
        userInput.value = minValueDefault;
        buttonMakeAGuess.removeAttribute('disabled');
        statsStepSpan.innerText = 0;
    }, 1000);
});

minValueInput.addEventListener('change', changeMinAndMaxValue);
maxValueInput.addEventListener('change', changeMinAndMaxValue);

minValueInput.addEventListener('focusin', () => { minValueDefault = Number(minValueInput.value); });
maxValueInput.addEventListener('focusin', () => { maxValueDefault = Number(maxValueInput.value); });





// ===============================================
// ======== THE COMPUTER GUESS THE NUMBER ========
// ===============================================



let selectedNumber = 0,
    minNumberComp = 1,
    maxNumberComp = 10,
    compGuess = [],
    userInputComp = document.getElementById('numGuessComp'),
    plusButton = document.getElementById('plusButtonComp'),
    minusButton = document.getElementById('minusButtonComp'),
    rightNumberButton = document.getElementById('rightNumber'),
    minValueInputComp = document.getElementById('minValueComp'),
    maxValueInputComp = document.getElementById('maxValueComp'),
    guessResultComp = document.querySelector('#guessResultComp p'),
    startButtonComp = document.getElementById('startButtonComp'),
    statsStepComp = document.querySelector('#statsComp span');


// ======== DISABLE EVERYTHING THAT IS DON'T NEEDED ========

rightNumberButton.setAttribute('disabled', '');
minusButton.setAttribute('disabled', '');
plusButton.setAttribute('disabled', '');


// ======== IF THE INITIAL INPUT CHANGE, CHECK IF IT'S A NUMBER BETWEEN MIN & MAX AND RESET THE GAME ========

userInputComp.addEventListener('change', () => {
    selectedNumber = Number(userInputComp.value);
    if(isNaN(selectedNumber) || selectedNumber === 0){
        alert("Please, enter a number.");
        return false;
    }
    if(selectedNumber > maxNumberComp){
        alert(`Please enter a number between ${minNumberComp} and ${maxNumberComp}.`);
        userInputComp.value = minNumberComp;
        return false;
    }

    resetAllComp();
});

function compNumberGuess(min = minNumberComp, max = maxNumberComp){
    let number = 0,
        doTurn = 0;

    do{
        doTurn++;
        number = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(number);
        if(doTurn > 5){
            number = Math.floor(Math.random() * (max - min + 1) + min);
            break;
        }
    }while(compGuess.includes(number));

    compGuess.push(number);
    console.log(compGuess);
    guessResultComp.innerText = number;
    statsStepComp.innerText = compGuess.length;
}

function changeMinMaxComp(){
    let newMin = Number(minValueInputComp.value),
        newMax = Number(maxValueInputComp.value);

    if(newMin >= newMax || isNaN(newMin) || isNaN(newMax) || newMin === 0){
        minValueInputComp.value = minNumberComp;
        maxValueInputComp.value = maxNumberComp;
        alert("Make sure that the min is lower and different than the max and that they're both numbers higher than 0!");
        return false;
    }

    minNumberComp = Number(minValueInputComp.value);
    maxNumberComp = Number(maxValueInputComp.value);

    resetAllComp();
}

function compTryGuessing(operator = 'start'){
    if((operator === '+' && Number(guessResultComp.innerText) >= Number(userInputComp.value)) || (operator === '-' && Number(guessResultComp.innerText) <= Number(userInputComp.value)) || (operator === '1' && Number(guessResultComp.innerText) !== Number(userInputComp.value))){
        alert(`I don't think that's right.`);
        return false;
    }

    if(operator === '+'){
        let newNumber = Number(guessResultComp.innerText);
        minNumberComp = newNumber;
    }else if(operator === '-'){
        let newNumber = Number(guessResultComp.innerText);
        maxNumberComp = newNumber;
    }else if(operator === '1'){
        // The number is right
        rightNumberButton.setAttribute('disabled', '');
        minusButton.setAttribute('disabled', '');
        plusButton.setAttribute('disabled', '');
        startButtonComp.removeAttribute('disabled');

        guessResultComp.innerText += `; It tooks ${compGuess.length} turns to get your number.`;

        return true;
    }

    if(operator === 'start'){
        startButtonComp.setAttribute('disabled', '');
        rightNumberButton.removeAttribute('disabled');
        minusButton.removeAttribute('disabled');
        plusButton.removeAttribute('disabled');
    }

    compNumberGuess();
}

function resetAllComp(){
    statsStepComp.innerText = 0;
    compGuess = [];
    rightNumberButton.setAttribute('disabled', '');
    minusButton.setAttribute('disabled', '');
    plusButton.setAttribute('disabled', '');
    startButtonComp.removeAttribute('disabled');
    guessResultComp.innerText = '';
}

startButtonComp.addEventListener('click', () => {
    if(!isNaN(userInputComp.value) && Number(userInputComp.value) > 0 && !isNaN(maxValueInputComp.value) && Number(maxValueInputComp.value) > 0 && Number(maxValueInputComp.value) > Number(minValueInputComp.value) && Number(userInputComp.value) >= Number(minValueInputComp.value) && Number(userInputComp.value) <= Number(maxValueInputComp.value)){
        resetAllComp();
        compTryGuessing();
        return true;
    }

    alert(`The numbers you have entered are not correct! Please check them.`);
});

minusButton.addEventListener('click', () => { compTryGuessing('-'); });
plusButton.addEventListener('click', () => { compTryGuessing('+'); });
rightNumberButton.addEventListener('click', () => { compTryGuessing('1'); });

minValueInputComp.addEventListener('change', changeMinMaxComp);
maxValueInputComp.addEventListener('change', changeMinMaxComp);

minValueInputComp.addEventListener('focusin', () => { minNumberComp = Number(minValueInputComp.value); });
maxValueInputComp.addEventListener('focusin', () => { maxNumberComp = Number(maxValueInputComp.value); });