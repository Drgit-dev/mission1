// ==========================================
// 1. SELECCIÓN DE NODOS DEL DOM
// ==========================================
const usernameInput = document.querySelector('#username');
const btnOracle = document.querySelector('#btn-oracle');
const oracleResult = document.querySelector('#oracle-result');

const btnRoll = document.querySelector('#btn-roll');
const dicePlayer = document.querySelector('#dice-player');
const diceCpu = document.querySelector('#dice-cpu');
const gameStatus = document.querySelector('#game-status');
const scoreWinEl = document.querySelector('#score-win');
const scoreLossEl = document.querySelector('#score-loss');

// ==========================================
// 2. ESTADO DE LA APLICACIÓN
// ==========================================
let scoreWins = 0;
let scoreLosses = 0;

const predictions = [
  "dominará el DOM sin usar frameworks.",
  "encontrará un bug en producción a las 5 PM un viernes.",
  "olvidará poner el 'where' en un DELETE pero sobrevivirá.",
  "escribirá un código tan limpio que llorará de emoción.",
  "será bendecido por los dioses de JavaScript."
];

// ==========================================
// 3. LÓGICA DEL ORÁCULO
// ==========================================
function getOraclePrediction() {
  const name = usernameInput.value.trim();

  if (name === '') {
    oracleResult.textContent = '⚠️ Por favor, escribe tu nombre primero.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * predictions.length);
  const selectedPrediction = predictions[randomIndex];

  // Uso de Template Literals
  oracleResult.textContent = `🔮 ${name}, hoy ${selectedPrediction}`;
}

// Evento al pulsar el botón
btnOracle.addEventListener('click', getOraclePrediction);

// Evento al presionar Enter en el input
usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getOraclePrediction();
  }
});

// ==========================================
// 4. LÓGICA DEL JUEGO DE DADOS
// ==========================================
function rollDice() {
  const playerRoll = Math.floor(Math.random() * 6) + 1;
  const cpuRoll = Math.floor(Math.random() * 6) + 1;

  // Actualizar DOM de los dados
  dicePlayer.textContent = playerRoll;
  diceCpu.textContent = cpuRoll;

  // Evaluar resultado
  if (playerRoll > cpuRoll) {
    gameStatus.textContent = '🎉 ¡Has ganado esta ronda!';
    scoreWins++;
    scoreWinEl.textContent = scoreWins;
  } else if (cpuRoll > playerRoll) {
    gameStatus.textContent = '💥 La CPU ha ganado esta ronda.';
    scoreLosses++;
    scoreLossEl.textContent = scoreLosses;
  } else {
    gameStatus.textContent = '🤝 ¡Empate!';
  }
}

btnRoll.addEventListener('click', rollDice);

// ==========================================
// 5. ★ BONUS: DARK MODE CON TECLA SECRETA
// ==========================================
// La secuencia secreta es la palabra "dark"
const secretCode = 'dark';
let typedKeys = '';

window.addEventListener('keydown', (event) => {
  // Evitar capturar cuando el usuario escribe en inputs de texto
  if (event.target.tagName === 'INPUT') return;

  typedKeys += event.key.toLowerCase();

  // Mantener solo los últimos caracteres equivalentes a la longitud de la clave
  if (typedKeys.length > secretCode.length) {
    typedKeys = typedKeys.substring(typedKeys.length - secretCode.length);
  }

  // Comprobar si coincide la palabra secreta
  if (typedKeys === secretCode) {
    document.body.classList.toggle('dark-mode');
    console.log('🌙 Modo oscuro alternado por código secreto.');
  }
});