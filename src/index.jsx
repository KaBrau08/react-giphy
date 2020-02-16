//*! // -------- React --------------------------------------------------------- */
// Métodos de React
import React from 'react';
// Métodos de React para el DOM
import ReactDOM from 'react-dom';

//*! // -------- CSS ----------------------------------------------------------- */
import './sass/settings.sass';

//*! // -------- Componentes --------------------------------------------------- */
// MainComponent: Componente principal de la aplicación
import MainComponent from './static/main.component';

//*! // -------- Componente funcional ------------------------------------------ */
const AppComponent = () => {
	// --------- Elementos del componente / Render React
	return <MainComponent />;
};

//*! // -------- Render de la aplicación --------------------------------------- */
ReactDOM.render(<AppComponent />, document.querySelector('#root'));