// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerValor = null;
let segundoValor = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 25;
let pararTiempo = null;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
// Generar numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

// Funciones secundarias
function iniciarTiempo() {
	pararTiempo = setInterval(() => {
		timer--;
		mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
		if (timer === 0) {
			clearInterval(pararTiempo);
			mostrarTiempo.innerHTML = 'Lo siento Perdiste 😢';
			mostrarTodos();
		}
	}, 1000);
}

function mostrarTodos() {
	for (let i = 0; i < 16; i++) {
		let tarjeta = document.getElementById(i);
		tarjeta.innerHTML = numeros[i];
		tarjeta.disabled = true;
	}
}

function reload() {
	location.reload();
}

// Funcion principal
function destapar(id) {
	// Iniciar tiempo
	if (temporizador === false) {
		iniciarTiempo();
		temporizador = true;
	}

	tarjetasDestapadas++;
	console.log(tarjetasDestapadas);
	if (tarjetasDestapadas === 1) {
		tarjeta1 = document.getElementById(id);
		primerValor = numeros[id];
		tarjeta1.innerHTML = primerValor;

		// Deshabilitar primer boton
		tarjeta1.disabled = true;

		// Segunda comparacion
	} else if (tarjetasDestapadas === 2) {
		tarjeta2 = document.getElementById(id);
		segundoValor = numeros[id];
		tarjeta2.innerHTML = segundoValor;

		// Deshabilitar primer boton
		tarjeta2.disabled = true;

		// Incrementar movimientos
		movimientos++;
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if (primerValor === segundoValor) {
			// Resetear tarjetas destapadas
			tarjetasDestapadas = 0;

			// Incrementar aciertos
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

			// Terminar el juego
			if (aciertos === 8) {
				clearInterval(pararTiempo);
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥇`;
				mostrarTiempo.innerHTML = `Fantástico...!!! Ganaste 🏆  Sólo te demoraste ${
					25 - timer
				} segundos`;
			}
		} else {
			// Mostrar momentaneamente los valores y volver a tapar
			setTimeout(() => {
				tarjeta1.innerHTML = null;
				tarjeta2.innerHTML = null;
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
			}, 800);
		}
	}
}
