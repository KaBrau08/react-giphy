// --------- Celebraciones por mes
const monthCelebrations = [
	'reyes+magos',
	'love',
	'spring',
	'kids+day',
	'mother+day',
	'father+day',
	'independency+day',
	'grandparent+day',
	'mexico',
	'halloween',
	'dia+de+muertos',
	'christmas'
];
// --------- Selecciono la celebración de acuerdo al mes
const date = new Date();
const monthNumber = date.getMonth();
const celebration = monthCelebrations[monthNumber];
// --------- Exporto la celebración
export default celebration;