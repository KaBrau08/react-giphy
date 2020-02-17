//*! // -------- React --------------------------------------------------------- */
import React, { useState, useEffect, Fragment } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Axios from 'axios';
import Macy from 'macy';

//*! // -------- Mock ---------------------------------------------------------- */
import celebration from '../mock/celebration';
import PreloaderComponent from './preloader.component';

//*! // -------- Componente funcional ------------------------------------------ */
const HomeComponent = props => {
	// --------- Propiedades
	const { endpoint, searchStatus } = props;

	// --------- Estados
	// Resultados de la consulta para home
	const [result, setResult] = useState([]);
	// Ocultar a preloader cuando se terminen de cargar las imágenes
	const [preloader, setPreloader] = useState(true);

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
			macyInstance.on(macyInstance.constants.EVENT_IMAGE_COMPLETE, () => setPreloader(false));
		};
		resultLength > 0 && mounting();
		return () => { macyInstance && macyInstance.remove(); };
	});

	// --------- Clases
	const cssClass = searchStatus ? 'home-container hide-home' : 'home-container';

	// --------- Elementos del componente / Render React
	return (
		<Fragment>
			<PreloaderComponent status={preloader} />
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
		</Fragment>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default HomeComponent;