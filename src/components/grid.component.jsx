//*! // -------- React --------------------------------------------------------- */
import React, { useState, useEffect } from 'react';

//*! // -------- Librerías ----------------------------------------------------- */
import Macy from 'macy';

//*! // -------- Componentes --------------------------------------------------- */
import DetailsModalComponent from './details-modal.component';
import PaginationComponent from './pagination.component';

//*! // -------- Componente funcional ------------------------------------------ */
const GridComponent = props => {
	// --------- Propiedades
	const { search, searchResult, pagination, handleRequest } = props;

	// --------- Estados
	const [gifDetails, setGifDetails] = useState(null);

	// --------- Manejadores
	const handleMouseInOut = (event, data) => {
		const { currentTarget } = event;
		const { url } = data;
		const img = currentTarget.querySelector('img');
		img.setAttribute('src', url);
	};
	const detailsOpen = (event, image, title, rating) => {
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
		};
		resultLength > 0 && mounting();
		return () => { macyInstance && macyInstance.remove(); };
	}, [searchResult]);

	// --------- Temporal
	// useEffect(() => { console.log(gifDetails); }, [gifDetails]);

	// --------- Elementos del componente / Render React
	return (
		<div className="grid-container">
			<div className="grid-wrapper">
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
									onMouseEnter={event => handleMouseInOut(event, fixed_width)}
									onMouseLeave={event => handleMouseInOut(event, fixed_width_still)}
									onClick={event => detailsOpen(event, original, title, rating)}
								>
									<img src={fixed_width_still.url} alt="" />
									<div className="gif-details">
										<div className="gif-title">{title}</div>
										<div className="gif-rating">{rating}</div>
									</div>
								</div>
							);
						})
					}
				</div>
				<PaginationComponent {...{ search, pagination, handleRequest }} />
			</div>
			{gifDetails && <DetailsModalComponent {...{ gifDetails, detailsClose }} />}
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default GridComponent;