/**
* @fileoverview Código Javascript de la primera parte de la practica: la claculadora.
* @author Jesús Gamero Méndez
* @version 1.1b
*/

var n1 = 0;
var n2 = 0;
var op = 0;
var coma = true; //Lo uso para activar y desactivar la coma.

/**
 * Permite introducir por el teclado un valor numérico.
 * @param {} valor - Número introducido
 */
function teclear(valor) { //Todo se gurda en el n1.
	if (n1 == 0 && n1 !== '0.') {
		document.getElementById("inferior").innerHTML = valor;
		n1 = document.getElementById("inferior").innerHTML;
	}
	else {
		document.getElementById("inferior").innerHTML += valor;
		n1 = document.getElementById("inferior").innerHTML;
	}
}

/** 
 * Permite pasar por parámetro una operación
 * @param  {} valor - Operación introducida
 */
function operar(valor) {
	if (n1 == 0) {
		n1 = parseFloat(document.getElementById("inferior").innerHTML);
	}

	// Hasta que no pulso alguna operación todo lo que tecleo es numero 1 una vez pulso 
	// una operación el num1 es guarda en num2 y empiezo un nuevo número1.

	n2 = parseFloat(n1);
	n1 = 0;
	coma = true;
	op = valor;


	if (n2 % 1 == 0) {
		document.getElementById("superior").innerHTML = n2 + " " + op;
	}
	else {
		document.getElementById("superior").innerHTML = n2.toFixed(2) + " " + op;
	}

}

/**
 * Permite añadir una coma al valor numérico.
 */
function fcoma() {
	if (coma == true) { //Puedo insertar la coma.
		if (n1 == 0) {
			n1 = '0.';
		}
		else {
			n1 += '.';
		}

		document.getElementById("inferior").innerHTML = n1;
	}
	coma = false;
}

/**
 * Permite borrar todo.
 */
function borrar() {
	n1 = 0;
	n2 = 0;
	op = 0;
	coma = true;
	document.getElementById("inferior").innerHTML = n1;
	document.getElementById("superior").innerHTML = null;
}

/**
 * Permite borrar el último elemento.
 */
function ce() {
	n1 = 0; //borro n1.
	coma = true; //Activo la coma.

	if (n2 != 0 && op != 0) { //Compruebo que n2 ni la operacion esten vacias para no mostrar nada en la parte superior
		document.getElementById("superior").innerHTML = n2 + " " + op;
		document.getElementById("inferior").innerHTML = n1;
	}
	else {
		document.getElementById("superior").innerHTML = null;
		document.getElementById("inferior").innerHTML = n1;
	}
}

/**
 * Permite retroceder un valor numérico de la operación.
 */
function retro() {
	cifra = n1.length;
	if (n1 != 0) { //Si el número es cero evito que haga el retroceso.

		caracter = n1.slice((n1.length - 1), n1.length); //Si borro la coma, me deja introducirla de nuevo.
		if (caracter == '.') { coma = true; }//Activo la coma.

		if (n1 != 0 && n1.length != 1) { // Si n1 esta completo y tiene mas de una cifra.
			n1 = n1.substr(0, cifra - 1);
		}
		else if (n2 != 0) {
			n1 = 0;
		}
		else { //Si borro la ultima cifra de n1 pongo 0
			n1 = 0;
		}
	}
	document.getElementById("inferior").innerHTML = n1;
}

/**
 * Según la operación recibida realiza los calculos.
 */
function resultado() {
	coma = true;
	n1 = parseFloat(n1);
	if (op == '+' || op == '-' || op == '*' || op == '/') { //Con esto evito que haga la operacion repetidamente al puslar igual.
		if (n1 == 0 && n2 == 0) {
			document.getElementById("superior").innerHTML = null;
		}
		else if (n1 % 1 == 0 && n2 % 1 != 0) {
			document.getElementById("superior").innerHTML = n2.toFixed(2) + " " + op + " " + n1;
		}
		else if (n1 % 1 != 0 && n2 % 1 == 0) {
			document.getElementById("superior").innerHTML = n2 + " " + op + " " + n1.toFixed(2);
		}
		else if (n1 % 1 != 0 && n2 % 1 != 0) {
			document.getElementById("superior").innerHTML = n2.toFixed(2) + " " + op + " " + n1.toFixed(2);
		}
		else {
			document.getElementById("superior").innerHTML = n2 + " " + op + " " + n1;
		}

		// n2 es el primer número que introducí y n1 es el último que he tecleado.
		switch (op) {
			case '+':
				n1 += n2;
				break;
			case '-':
				n1 = n2 - n1;
				break;
			case '*':
				n1 *= n2;
				break;
			case '/':
				n1 = n2 / n1;
				break;
		}

		if (n1 % 1 == 0) {
			document.getElementById("inferior").innerHTML = n1;
		}
		else {
			document.getElementById("inferior").innerHTML = n1.toFixed(3);
		}
		n2 = parseFloat(n1);
		n1 = 0;
		op = 0;
	}
}

/**
 * Realiza la raiz cuadrada.
 */
function raiz() {

	n1 = parseFloat(n1);
	coma = true;
	if (n1 % 1 == 0) {
		document.getElementById("superior").innerHTML = n1 + " &#8730;";
	}
	else {
		document.getElementById("superior").innerHTML = n1.toFixed(2) + " &#8730;";
	}

	n1 = Math.sqrt(n1);

	if (n1 % 1 == 0) {
		document.getElementById("inferior").innerHTML = n1;
	}
	else {
		document.getElementById("inferior").innerHTML = n1.toFixed(3);
	}

}

/**
 * Calcula el cuadrado del número seleccionado anteriormente.
 */
function cuadrado() {

	n1 = parseFloat(n1);
	coma = true;
	if (n1 % 1 == 0) {
		document.getElementById("superior").innerHTML = n1 + " x&#178;";
	}
	else {
		document.getElementById("superior").innerHTML = n1.toFixed(2) + " x&#178;";
	}
	n1 = Math.pow(n1, 2);

	if (n1 % 1 == 0) {
		document.getElementById("inferior").innerHTML = n1;
	}
	else {
		document.getElementById("inferior").innerHTML = n1.toFixed(3);
	}
}

/**
 * Calcula la centésima parte del número seleccionado anteriormente.
 */
function porcentaje() {
	n1 = parseFloat(n1);
	coma = true;
	if (n1 % 1 == 0) {
		document.getElementById("superior").innerHTML = n1 + "%";
	}
	else {
		document.getElementById("superior").innerHTML = n1.toFixed(2) + "%";
	}

	n1 = n1 / 100;

	if (n1 % 1 == 0) {
		document.getElementById("inferior").innerHTML = n1;
	}
	else {
		document.getElementById("inferior").innerHTML = n1.toFixed(2);
	}
}

/**
 * Cambia el signo del número.
 */
function signo() {
	n1 = -n1;
	document.getElementById("inferior").innerHTML = n1;
}


