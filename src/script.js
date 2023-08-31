const possibleWords = [
    'CARRO',
    'PAPEL',
    'FESTA',
    'CAIXA',
    'LIVRO',
    'LINHA',
    'PLANO',
    'MESMO',
    'TEMPO',
    'NOITE',
    'ROSTO',
    'SOLAR',
    'VERDE',
    'NORTE',
    'PORTA',
    'GLOBO',
    'PRATO',
    'PEDRA',
    'JOGAR',
    'DENTE',
    'SALTO',
    'TINTA',
    'RISCO',
    'FALAR',
    'VIVER',
    'LUZES',
    'PODER',
    'VENTO',
    'FOLHA',
    'SONHO',
    'CHAVE',
    'RITMO',
    'NEVOA',
    'TROCA',
    'TERRA',
    'VALER',
    'CANTO',
    'PERTO',
    'DANCA',
    'MELAO',
    'LARVA',
    'CORPO',
    'PONTA',
    'CORAL',
    'TENSO',
    'CULTO',
    'MARCA',
    'ZEBRA',
    'FENDA',
    'GLOBO',
    'PRAZO',
    'SENSO',
    'SUTIL',
    'BACON',
    'BARCO',
    'SAMBA'
];

let usedWords = [];
let attempts = 0;
let maxAttempts = 6;

document.addEventListener('DOMContentLoaded', function() {
    setRow(attempts);
    let singleCharInputs = document.querySelectorAll('.singleCharInput');

    singleCharInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
            if (e.target.value && index < singleCharInputs.length - 1) {
                singleCharInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                let rowIndex = Array.from(input.parentElement.children).indexOf(input);
                if (rowIndex !== 0) {
                    singleCharInputs[index - 1].focus();
                    singleCharInputs[index - 1].value = '';
                }
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            makeGuess();
            singleCharInputs[0].focus();
        }
    });
});

function setRow(attempt) {
    let rows = document.querySelectorAll('.inputRow');
    rows.forEach((row, index) => {
        let inputs = row.querySelectorAll('.singleCharInput');
        if (index !== attempt) {
            inputs.forEach(input => {
                input.disabled = true;
                if (index === attempt + 1) {
                    input.value = '';
                }
            });
        } else {
            inputs.forEach(input => input.disabled = false);
            inputs[0].focus();
        }
    });
}

function chooseSecretWord() {
    let newWord = "";
    do {
        newWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    } while (usedWords.includes(newWord));

    usedWords.push(newWord);

    if (usedWords.length === possibleWords.length) {
        usedWords = [];
    }

    return newWord;
}

let secretWord = chooseSecretWord();

function makeGuess() {
    const inputs = document.querySelectorAll('.inputRow')[attempts].querySelectorAll('.singleCharInput');
    let userGuess = '';

    inputs.forEach(input => {
        userGuess += input.value;
    });

    if (userGuess.length !== 5) {
        alert('Digite uma palavra com 5 letras.');
        return;
    }

    let tempSecretWordArray = Array.from(secretWord);

    for (let i = 0; i < userGuess.length; i++) {
        let newBackgroundColor = '#2a2a2a';

        if (userGuess[i] === tempSecretWordArray[i]) {
            newBackgroundColor = '#3AA394';
            tempSecretWordArray[i] = null;
        } else if (tempSecretWordArray.includes(userGuess[i])) {
            newBackgroundColor = '#d2ac68';
            tempSecretWordArray[tempSecretWordArray.indexOf(userGuess[i])] = null;
        }

        if (inputs[i].style.backgroundColor !== newBackgroundColor) {
            inputs[i].style.transition = 'background-color 2s ease';
        } else {
            inputs[i].style.transition = 'none';
        }

        inputs[i].style.backgroundColor = newBackgroundColor;
        inputs[i].style.color = 'white';
        inputs[i].value = userGuess[i];
    }

    attempts++;

    if (userGuess === secretWord) {
        document.getElementById('attempts').textContent = 'GANHOU';
        attempts = 0;
        secretWord = chooseSecretWord();
        document.getElementById('attempts').textContent = `Tentativas: ${attempts} / ${maxAttempts}`;
    } else if (attempts >= maxAttempts) {
        document.getElementById('attempts').textContent = 'PERDEU';
        attempts = 0;
        secretWord = chooseSecretWord();
    } else {
        setRow(attempts);
        document.getElementById('attempts').textContent = `Tentativas: ${attempts} / ${maxAttempts}`;
    }
}

