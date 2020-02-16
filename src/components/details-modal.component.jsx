//*! // -------- React --------------------------------------------------------- */
import React, { useRef } from 'react';

//*! // -------- Componente funcional ------------------------------------------ */
const DetailsModalComponent = props => {
	// --------- Propiedades
	const { gifDetails, detailsClose } = props;
	const { webp, title, rating } = gifDetails;

	// --------- Referencias
	const detailsContainer = useRef(null);

	// --------- Manejadores
	const handleCloseModal = () => {
		const container = detailsContainer.current;
		container.classList.add('details-close');
		setTimeout(() => detailsClose(), 400);
	};
	// const handleCopyLink

	// --------- Elementos del componente / Render React
	return (
		<div className="details-container details-open" ref={detailsContainer}>
			<div className="details-mask" onClick={handleCloseModal} />
			<div className="details-wrapper">
				<div className="details-box">
					<div className="details-item">
						<img src={webp} alt="" />
						<div className="gif-details">
							<div className="gif-title">{title}</div>
							<div className="gif-rating">{rating}</div>
						</div>
						<div className="gif-close" onClick={handleCloseModal}>Close</div>
					</div>
				</div>
			</div>
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default DetailsModalComponent;