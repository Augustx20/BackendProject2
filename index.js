// Importamos la librería momentjs
const moment = require('moment');

const fechaActual = moment();

const fechaNacimiento = moment('2002-01-01');

if (!fechaNacimiento.isValid()) {
  console.log('La fecha de nacimiento no es válida');
  process.exit(1);
}
const diasDesdeNacimiento = fechaActual.diff(fechaNacimiento, 'days');

console.log(`Han pasado ${diasDesdeNacimiento} días desde mi nacimiento hasta hoy`);