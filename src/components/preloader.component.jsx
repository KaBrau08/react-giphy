//*! // -------- React --------------------------------------------------------- */
import React, { useState, useRef, useEffect } from 'react';

//*! // -------- Componente funcional ------------------------------------------ */
const PreloaderComponent = props => {
	// --------- Propiedades
	const { status, position } = props;

	// --------- Estados
	const [show, setShow] = useState(true);

	// --------- Referencias
	const container = useRef(null);

	// --------- Efectos
	useEffect(() => {
		if (!status) {
			const current = container.current;
			current.classList.add('preloader-out');
			setTimeout(() => setShow(false), 400);
		}
		else {
			setShow(true);
		}
	}, [status]);

	// --------- Elementos del componente / Render React
	if (!show) { return null };
	return (
		<div className="preloader-container" ref={container}>
			<div className="preloader-text" style={{ gridArea: position || 'body' }} />
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default PreloaderComponent;