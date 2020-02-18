//*! // -------- React --------------------------------------------------------- */
import React, { useState } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Axios from 'axios';

//*! // -------- Componentes --------------------------------------------------- */
import Home from '../components/home.component';
import Header from '../static/header.component';
import GridComponent from '../components/grid.component';

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
		const GIFLimit = args.limit || 40;
		// Paginación actual
		const GIFPagination = args.pagination || 0;
		// Calculo de offset
		const GIFOffset = GIFPagination * GIFLimit;
		// Palabra para la búsqueda
		const GIFSearch = args.search || '';
		// Tiempo para cambiar los estados del componente
		const time = args.time || 0;
		// URL para la consulta
		const GIFUrl = `${endpoint}&limit=${GIFLimit}&offset=${GIFOffset}&q=${GIFSearch}`;
		// Petición al endpoint
		(async () => {
			try {
				const response = await Axios.get(GIFUrl);
				const responseData = response.data;
				const { data:GIFData } = responseData;
				setTimeout(() => {
					setSearchResult(GIFData);
					setPagination(GIFPagination + 1);
				}, time);
			} catch (err) {
				console.error(err);
			}
		})();
	};

	// --------- Elementos del componente / Render React
	return (
		<main>
			<Header {...{ searchStatus, handleSearch, handleSearchStatus, handleRequest }} />
			{
				searchResult.length === 0 ? (
					<Home {...{ endpoint, searchStatus }} />
				) : (
					<GridComponent {...{ search, searchResult, pagination, handleRequest }} />
				)
			}
		</main>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default MainComponent;