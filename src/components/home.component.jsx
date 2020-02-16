//*! // -------- React --------------------------------------------------------- */
import React, { useState, useEffect } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Axios from 'axios';
import Macy from 'macy';

//*! // -------- Mock ---------------------------------------------------------- */
import celebration from '../mock/celebration';

//*! // -------- Componente funcional ------------------------------------------ */
const HomeComponent = props => {
	// --------- Propiedades
	const { endpoint, searchStatus } = props;

	// --------- Estados
	const [result, setResult] = useState([]);

	// --------- Manejadores
	// const handleOnLoad = () => { console.log('Hola'); };

	// --------- Efectos
	// Llamada al 'endpoint' de GIPHY
	useEffect(() => {
		const limit = '&limit=12';
		const search = `&q=${celebration}`;
		(async () => {
			const response = await Axios.get(`${endpoint}${limit}${search}`);
			const responseData = response.data;
			setResult(responseData.data);
		})();
	}, [endpoint]);
	// Creación del grid con Macy
	useEffect(() => {
		let macyInstance;
		let resultLength = result.length;
		const mounting = () => {
			macyInstance = new Macy({
				container: '#home-box',
				columns: 4
			});
		};
		resultLength > 0 && mounting();
		return () => { macyInstance && macyInstance.remove(); };
	});

	// --------- Clases
	const cssClass = searchStatus ? 'home-container hide-home' : 'home-container';

	// --------- Elementos del componente / Render React
	return (
		<div className={cssClass}>
			<div className="home-wrapper">
				<div id="home-box" className="home-box">
					{
						result.map(resultData => {
							const gifID = resultData.id;
							const gifURL = resultData.images.fixed_width.url;
							return <img src={gifURL} data-state="animate" alt="" key={gifID} />;
						})
					}
				</div>
			</div>
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default HomeComponent;