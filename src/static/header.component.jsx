//*! // -------- React --------------------------------------------------------- */
import React, { useState } from 'react';

//*! // -------- Componente funcional ------------------------------------------ */
const HeaderComponent = props => {
	// --------- Propiedades
	const { searchStatus, handleSearch, handleSearchStatus, handleRequest } = props;

	// --------- Estados
	const [search, setSearch] = useState('');

	// --------- Manejadores
	// Asigno el valor del input a 'search'
	const handleChange = event => {
		const { value } = event.target;
		setSearch(value);
	};
	// Envío de la consulta a GIPHY
	const handleSubmit = event => {
		event.preventDefault();
		if (search === '') { return; };
		handleSearch(search);
		handleSearchStatus(true);
		handleRequest({ search, time:400 });
	};

	// --------- Clases
	const cssClass = searchStatus ? 'header-collapse' : '';

	// --------- Elementos del componente / Render React
	return (
		<header className={cssClass}>
			<div className="header-wrapper">
				<div className="header-box">
					<div className="header-title">GIPHY - Search</div>
					<form className="header-search" onSubmit={handleSubmit}>
						<input type="text" placeholder="Search all the GIFs here..." value={search} onChange={handleChange} />
						<button type="submit">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</button>
					</form>
				</div>
			</div>
		</header>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default HeaderComponent;