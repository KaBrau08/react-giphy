//*! // -------- React --------------------------------------------------------- */
import React, { useState } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Axios from 'axios';

//*! // -------- Componentes --------------------------------------------------- */
import Home from '../components/home.component';

//*! // -------- Globales ------------------------------------------------------ */
// --------- GIPHY endpoint
const url = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'api_key=VsNUwUbLrkU2Ag0wTWjrEpVKjs2SwW4v';
const endpoint = `${url}${apiKey}`;

//*! // -------- Componente funcional ------------------------------------------ */
const MainComponent = () => {
	// --------- Estados
	// Palabra que se va a buscar
	const [search, setSearch] = useState('');
	// Verifica si el usuario ha buscado algo
	const [searchStatus, setSearchStatus] = useState(false);
	// Captura el resultado de la búsqueda
	const [searchResult, setSearchResult] = useState([]);
	// Paginación
	const [pagination, setPagination] = useState(0);

	// --------- Manejadores
	// Agrega la palabra que se tiene que buscar
	const handleSearch = text => setSearch(text);
	// Verifica si ya se ha hecho una petición
	const handleSearchStatus = status => setSearchStatus(status);
	// Peticiones al endpoint de GIPHY
	const handleRequest = args => {
		// Límite de GIF
		const limit = `&limit=${args.limit || 40}`;
		// Palabra para la búsqueda
		const search = `&q=${args.search}`;
		// Paginación
		const offset = `&offset=${args.offset || 0}`;
		// Tiempo para ejecutar a setTimeout
		const time = args.time || 0;
		// Petición al endpoint
		(async () => {
			try {
				const response = await Axios.get(`${endpoint}${limit}${search}${offset}`);
				const responseData = response.data;
				setTimeout(() => {
					setSearchResult(responseData.data);
					setPagination(responseData.pagination.offset);
				}, time);
			} catch (err) {
				console.error(err);
			}
		})();
	};

	// --------- Elementos del componente / Render React
	return (
		<main>
			<Home {...{ endpoint, searchStatus }} />
		</main>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default MainComponent;