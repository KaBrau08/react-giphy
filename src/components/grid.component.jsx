//*! // -------- React --------------------------------------------------------- */
import React, { useState, useEffect } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Macy from 'macy';

//*! // -------- Componentes --------------------------------------------------- */
import DetailsModalComponent from './details-modal.component';
import PaginationComponent from './pagination.component';
import PreloaderComponent from './preloader.component';

//*! // -------- Componente funcional ------------------------------------------ */
const GridComponent = props => {
	// --------- Propiedades
	const { search, searchResult, pagination, handleRequest } = props;

	// --------- Estados
	// Resultados de la consulta
	const [gifDetails, setGifDetails] = useState(null);
	// Ocultar a preloader cuando se terminen de cargar las imágenes
	const [preloader, setPreloader] = useState(true);

	// --------- Manejadores
	const handleMouseInOut = (event, data) => {
		const { currentTarget } = event;
		const { url } = data;
		const img = currentTarget.querySelector('img');
		img.setAttribute('src', url);
	};
	const detailsOpen = (image, title, rating) => {
		const { webp } = image;
		setGifDetails({ webp, title, rating });
	};
	const detailsClose = () => setGifDetails(null);

	// --------- Efectos
	// Creación del grid con Macy
	useEffect(() => {
		let macyInstance;
		let resultLength = searchResult.length;
		const mounting = () => {
			setPreloader(true);
			macyInstance = new Macy({
				container: '#grid-items',
				columns: 4,
				margin: 20,
				mobileFirst: true,
				breakAt: {
					320: 1,
					480: 2,
					768: 3,
					1200: 4
				}
			});
			macyInstance.on(macyInstance.constants.EVENT_IMAGE_COMPLETE, () => setPreloader(false));
		};
		resultLength > 0 && mounting();
		return () => { macyInstance && macyInstance.remove(); };
	}, [searchResult]);

	// --------- Elementos del componente / Render React
	return (
		<div className="grid-container">
			<div className="grid-wrapper">
				<PreloaderComponent status={preloader} position='header' />
				<PaginationComponent {...{ search, pagination, handleRequest }} />
				<div id="grid-items" className="grid-items">
					{
						searchResult.map(result => {
							const { id, title, rating, images } = result;
							const { fixed_width, fixed_width_still, original } = images;
							return (
								<div
									className="grid-item"
									key={id}
									onMouseOver={event => handleMouseInOut(event, fixed_width)}
									onMouseOut={event => handleMouseInOut(event, fixed_width_still)}
									onClick={() => detailsOpen(original, title, rating)}
								>
									<img src={fixed_width_still.url} alt="" />
									<div className="gif-instructions">Hover Me — Click Me</div>
								</div>
							);
						})
					}
				</div>
			</div>
			{gifDetails && <DetailsModalComponent {...{ gifDetails, detailsClose }} />}
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default GridComponent;