/**
* @fileoverview Código Javascript de la segunda parte de la practica: la agenda.
* @author Jesús Gamero Méndez
* @version 1.3
*/

/** 
 * Constructor de persona
 * @param  {} nombre 
 * @param  {} apellidos
 * @param  {} telefono
 * @param  {} email
 * @param  {} nacimiento
 */
function Persona(nombre, apellidos, telefono, email, nacimiento) {
	this.nombre = nombre;
	this.apellidos = apellidos;
	this.telefono = telefono;
	this.email = email;
	this.nacimiento = nacimiento;
}

//Creao el array e inserto varias personas de ejemplo.
var agenda = new Array();
agenda[0] = new Persona("Jesús", "Gamero Méndez", "924731834", "jesusgm@icloud.com", "1989-05-08");
agenda[1] = new Persona("Leire", "Ruiz Pérez", "945893456", "leirerp@gmail.com", "1989-06-04");
agenda[2] = new Persona("Laura", "Espinosa Salinas", "927346789", "espinozals@outlook.com", "1990-07-09");
agenda[3] = new Persona("Sandra", "Dominuez Romero", "945631454", "slanpino@gmail.com", "1992-12-03");
agenda[4] = new Persona("Juan", "Pichardo Méndez", "956702134", "juanpmendez@icloud.com", "1995-01-31");
agenda[5] = new Persona("Pedro", "Recio Sandobal", "924762145", "precio@outlook.com", "1991-10-11");
agenda[6] = new Persona("Santiago", "Pagudo Ramos", "927110856", "santipagudo@gmail.com", "1988-05-23");
agenda[7] = new Persona("Antonio", "Ruíz León", "966893212", "antruiz@outlook.com", "1976-05-23");

//Variable que me permite ver si el contacto es nuevo o es una modificación de uno ya existente.
nueva = false;

//Guardo en una variable la fecha de hoy en formato yyyy-mm-dd.
Date.prototype.toString = function () { return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate(); }
hoy = new Date();


/**
 * Función que genera la tabla con los datos del array
 */
function crearResumen() {
	for (var i = 0; i < agenda.length; i++) {
		document.write("<tr>");
		document.write("<td>" + agenda[i].nombre + "</td>");
		document.write("<td>" + agenda[i].apellidos + "</td>");
		document.write("<td>" + agenda[i].telefono + "</td>");
		document.write("<td>" + agenda[i].email + "</td>");
		document.write("<td>" + agenda[i].nacimiento + "</td>");
		document.write("</tr>");
	}
}

/**
 * Función que se ejecuta al pulsar el botón de nuevo, borra los campos para poder escribir una nueva persona.
 */
function nuevaPersona() {
	//Dejo los campos vacio y activo los botones si están desactivados.
	document.getElementById('nombre').value = null;
	document.getElementById('apellidos').value = null;
	document.getElementById('telefono').value = null;
	document.getElementById('email').value = null;
	document.getElementById('nacimiento').value = null;
	document.getElementById('bborrar').setAttribute('disabled', true);
	document.getElementById('bguardar').removeAttribute('disabled');
	document.getElementById('nombre').removeAttribute('disabled');
	document.getElementById('apellidos').removeAttribute('disabled');
	document.getElementById('telefono').removeAttribute('disabled');
	document.getElementById('email').removeAttribute('disabled');
	document.getElementById('nacimiento').removeAttribute('disabled');
	nueva = true; //Indico que el contacto es nuevo.
}

/**
 * Si la persona es nueva la añade al final de array, si no, la modifica.
 */
function guardarPersona() {
	if (nueva == true) { //Si el contacto es nuevo ...

		//Guardo lo introducido en variables.
		nnombre = document.getElementById('nombre').value;
		napellidos = document.getElementById('apellidos').value;
		ntelefono = document.getElementById('telefono').value;
		nemail = document.getElementById('email').value;
		nnacimiento = document.getElementById('nacimiento').value;

		//////////////////REALIZO EL FILTRADO DE LOS CAMPOS///////////////////////////////////////////////////////

		if (nnombre != '') { //Compruebo que el campo tenga un nombre obligatorio.

			if (ntelefono !== '' && !tlfValido(ntelefono)) //Compruebo que el telefono tenga un formato válido de nueve dígitos.
			{
				window.alert("TELÉFONO INVÁLIDO: Debes introducir un teléfono que tenga un formato válido (9 dígitos).");
			}
			else if (nemail !== '' && !emailValido(nemail)) //Compruebo que el email tenga un formato válido.
			{
				window.alert("EMAIL INVÁLIDO: Debes introducir un email que tenga un formato válido.");
			}
			else if (nnacimiento.toString() > hoy.toString()) { //Evito que la fecha de nacimiento sea superior a hoy.
				window.alert("FECHA INVÁLIDA: El día es superior al de hoy."); //Compruebo que la persona haya nacido en una fecha posterior a hoy.
			}
			else {

				//Si todo lo anterior se cumple, lo añado al final de array.				
				nueva = new Persona(nnombre, napellidos, ntelefono, nemail, nnacimiento);
				agenda.push(nueva);

				//Añado una nueva fila con el nuevo contacto a la tabla resumen.
				var tabla = document.getElementById("tresumen");
				var fila = tabla.insertRow(agenda.length);
				var cell1 = fila.insertCell(0);
				var cell2 = fila.insertCell(1);
				var cell3 = fila.insertCell(2);
				var cell4 = fila.insertCell(3);
				var cell5 = fila.insertCell(4);
				cell1.innerHTML = nnombre;
				cell2.innerHTML = napellidos;
				cell3.innerHTML = ntelefono;
				cell4.innerHTML = nemail;
				cell5.innerHTML = nnacimiento;

				//Actualizo las etiquetas y muestro el registro.
				refrescarID(agenda.length);
				verRegistro(agenda.length - 1);
				nueva = false;

				//Elimino el disable de los botones.
				document.getElementById('bborrar').removeAttribute('disabled');
				document.getElementById('bmostrar').removeAttribute('disabled');
				document.getElementById('primero').removeAttribute('disabled');
				document.getElementById('anterior').removeAttribute('disabled');
				document.getElementById('siguiente').removeAttribute('disabled');
				document.getElementById('ultimo').removeAttribute('disabled');
				document.getElementById('bbus').removeAttribute('disabled');
				document.getElementById('bguardar').removeAttribute('disabled');
				document.getElementById('nid').removeAttribute('disabled');
				document.getElementById('busqueda').removeAttribute('disabled');
			}
		}
		else {
			window.alert("NOMBRE VACIO: El contacto debe tener al menos un nombre."); // No se ha introducido un nombre.
		}
	}
	else { //Si no, es una modificación de uno ya existente.
		if (document.getElementById('nombre').value != '') { //Compruebo que el campo tenga un nombre obligatorio.

			id = (document.getElementById('nid').value) - 1;

			//Guardo los campos y compruebo posteriormente el filtrado de alguno de ellos antes de guardarlos.
			agenda[id].nombre = document.getElementById('nombre').value;
			agenda[id].apellidos = document.getElementById('apellidos').value;

			//////////////////REALIZO EL FILTRADO DE LOS CAMPOS///////////////////////////////////////////////////////

			if (document.getElementById('telefono').value !== '' && !tlfValido(document.getElementById('telefono').value)) //Compruebo que el telefono tenga un formato válido de nueve dígitos.
			{
				window.alert("TELÉFONO INVÁLIDO: Debes introducir un teléfono que tenga un formato válido (9 dígitos).");
			}
			else if (document.getElementById('email').value != '' && !emailValido(document.getElementById('email').value)) //Compruebo que el emial tenga un formato válido.
			{
				window.alert("EMAIL INVÁLIDO: Debes introducir un email que tenga un formato válido.");
			}
			else if (document.getElementById('nacimiento').value.toString() > hoy.toString()) //Evito que la fecha de nacimiento sea superior a hoy
			{
				window.alert("FECHA INVÁLIDA: El día es superior al de hoy."); //Compruebo que la persona haya nacido en una fecha posterior a hoy.
			}
			else {
				agenda[id].email = document.getElementById('email').value;
				agenda[id].telefono = document.getElementById('telefono').value;
				agenda[id].nacimiento = document.getElementById('nacimiento').value;

				//En caso de que esté todo correcto modifico la fila de la tabla resumen.

				document.getElementById('tresumen').deleteRow(id + 1); //Borro la fila de la tabla.
				var tabla = document.getElementById("tresumen");
				var fila = tabla.insertRow(id + 1); //Añado la fila en la misma posición.
				var cell1 = fila.insertCell(0);
				var cell2 = fila.insertCell(1);
				var cell3 = fila.insertCell(2);
				var cell4 = fila.insertCell(3);
				var cell5 = fila.insertCell(4);
				cell1.innerHTML = document.getElementById('nombre').value;
				cell2.innerHTML = document.getElementById('apellidos').value;
				cell3.innerHTML = document.getElementById('telefono').value;
				cell4.innerHTML = document.getElementById('email').value;
				cell5.innerHTML = document.getElementById('nacimiento').value;
			}
		}
		else {
			window.alert("NOMBRE VACIO: El contacto debe tener al menos un nombre."); // No se ha introducido un nombre.
		}
	}
}

/**
 * Borra la persona que tenemos selecionada actualmente.
 */
function borrarPersona() {
	id = document.getElementById('nid').value - 1;
	agenda.splice(id, 1); //Borro del array.
	document.getElementById('tresumen').deleteRow(id + 1); //Borro la fila de la tabla.

	if (id == 0 && agenda.length > 0) { //En caso de que borre el primer elemento hago que siempre se muestre el siguiente elemento del borrado.
		refrescarID(1);
		verRegistro(0);
	}
	else if (id == 0 && agenda.length == 0) { //En caso de que el array se quede vacio, pongo todo a 0 y llamo a la funcion nuevaPersona.
		document.getElementById('bmostrar').setAttribute('disabled', true);
		document.getElementById('primero').setAttribute('disabled', true);
		document.getElementById('anterior').setAttribute('disabled', true);
		document.getElementById('siguiente').setAttribute('disabled', true);
		document.getElementById('ultimo').setAttribute('disabled', true);
		document.getElementById('bbus').setAttribute('disabled', true);
		document.getElementById('bguardar').setAttribute('disabled', true);
		document.getElementById('bborrar').setAttribute('disabled', true);
		document.getElementById('nombre').setAttribute('disabled', true);
		document.getElementById('apellidos').setAttribute('disabled', true);
		document.getElementById('telefono').setAttribute('disabled', true);
		document.getElementById('email').setAttribute('disabled', true);
		document.getElementById('nacimiento').setAttribute('disabled', true);
		document.getElementById('nid').setAttribute('disabled', true);
		document.getElementById('busqueda').setAttribute('disabled', true);
		document.getElementById('etiqueta').innerHTML = "&nbsp;&nbsp;0 de " + agenda.length + "&nbsp;&nbsp;";
		document.getElementById('nombre').value = null;
		document.getElementById('apellidos').value = null;
		document.getElementById('telefono').value = null;
		document.getElementById('email').value = null;
		document.getElementById('nacimiento').value = null;
	}
	else {
		refrescarID(id);
		verRegistro(id - 1);
	}
}

/**
 * Función actualiza el id del campo nentrada y de la etiqueta de de los botones de navegacion entre registros.
 * @param  {} id
 */
function refrescarID(id) {
	document.getElementById('nid').value = id; //Actualizo el campo de búsqueda de nentrada.
	document.getElementById('etiqueta').innerHTML = "&nbsp;&nbsp;" + id + " de " + agenda.length + "&nbsp;&nbsp;";
}

/**
 * Función muestra los registros de la persona selecionada en los campos de texto correspondiente.
 * @param  {} id
 */
function verRegistro(id) {
	document.getElementById('nombre').value = agenda[id].nombre;
	document.getElementById('apellidos').value = agenda[id].apellidos;
	document.getElementById('telefono').value = agenda[id].telefono;
	document.getElementById('email').value = agenda[id].email;
	document.getElementById('nacimiento').value = agenda[id].nacimiento;
}

/**
 * Función onload que carga el primer registro de la agenda.
 */
function abrirInicio() {
	refrescarID(1);
	verRegistro(0);
}

/**
 * Función que busca en el array agenda si el nombre de alguna persona coincide con lo tecleado en el campo de búsqueda.
 */
function buscarNombre() {
	bus = document.getElementById('busqueda').value;
	bus = bus.toUpperCase(); //Convierto a mayuscula.
	res = null; //Guardo el índice del resultado.

	for (x = 0; x < agenda.length; x++) {

		condicion = agenda[x].nombre;

		if (condicion.toUpperCase() == bus) {
			refrescarID(x + 1);
			verRegistro(x);
			res = x;
		}
	}
	if (res == null) {
		window.alert("No se han ecnontrado coincidencias con el nombre.");
	}
}

/**
 * Función que busca en el array agenda si los apellidos de alguna persona coincide con lo tecleado en el campo de búsqueda.
 */
function buscarApellido() {
	bus = document.getElementById('busqueda').value;
	bus = bus.toUpperCase(); //Convierto a mayuscula.
	res = null; //Guardo el índice del resultado.

	for (x = 0; x < agenda.length; x++) {

		condicion = agenda[x].apellidos;

		if (condicion.toUpperCase() == bus) {
			refrescarID(x + 1);
			verRegistro(x);
			res = x;
		}
	}

	if (res == null) {
		window.alert("No se han ecnontrado coincidencias con el apellido.");
	}

}

/**
 * Selecciona y muestra la entrada escogido en el campo número de entrada.
 */
function verEntrada() {
	var id = document.getElementById("nid").value;

	if (id <= 0 || id > agenda.length) {
		window.alert("ENTRADA INVÁLIDA: Debes introducir un número válido.");
		ultimoRegistro();
	}
	else {
		refrescarID(id);
		id--;
		if (id >= 0 && id <= agenda.length) {
			verRegistro(id);
		}
	}
}

/**
 * Botón de navegación de siguiente, avanza un registro y lo muestra.
 */
function siguienteRegistro() {
	id = document.getElementById('nid').value;

	if (id > agenda.length - 1) {
		window.alert("ÚLTIMA ENTRADA: Has llegado al último registro de la agenda.");
	}
	else {
		id++;
		refrescarID(id);
		verRegistro(id - 1);
	}
}

/**
 * Botón de navegación de anterior, retrocede un registro y lo muestra.
 */
function anteriorRegistro() {
	id = document.getElementById('nid').value;

	if (id <= 1) {
		window.alert("PRIMERA ENTRADA: Has llegado al primer registro de la agenda.");
	}
	else {
		id--;
		refrescarID(id);
		verRegistro(id - 1);
	}
}

/**
 * Botón de navegación que seleciona y muestra el último registro de la agenda.
 */
function ultimoRegistro() {
	refrescarID(agenda.length);
	verRegistro(agenda.length - 1);
}

/**
 * Botón de navegación que seleciona y muestra el primer registro de la agenda.
 */
function primerRegistro() {
	refrescarID(1);
	verRegistro(0);
}

/**
 * Función que solo me deja teclear números en el campo teléfono.
 */
function esNumero(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		window.alert("Debes introducir solo números, no letras.");
		return false;
	}

	return true;
}

/**
 * Función con expresión regular que comprueba que el email tiene un formato válido.
  */
function emailValido(mail) {
	return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}

/**
 * Función con expresión regular que comprueba que el teléfono tenga un formato válido.
  */
function tlfValido(tlf) {
	if (!(/^\d{9}$/.test(tlf))) { return false; }
	else { return true; }
}