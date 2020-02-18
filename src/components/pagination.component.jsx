//*! // -------- React --------------------------------------------------------- */
import React, { useState, useEffect } from 'react';

//*! // -------- Componente funcional ------------------------------------------ */
const PaginationComponent = props => {
	// --------- Propiedades
	const { search, pagination, handleRequest } = props;

	// --------- Estados
	const [pagArray, setPagArray] = useState([]);

	// --------- Efectos
	useEffect(() => {
		const start = pagination <= 3 ? 1 : (pagination - 2);
		const end = pagination <= 3 ? 5 : (pagination + 2);
		const arr = [];
		for (let i = start; i <= end; i++) { arr.push(i); };
		setPagArray(arr);
	}, [pagination]);

	// --------- Manejadores
	const handleClick = number => handleRequest({ pagination:number, search });

	// --------- Elementos del componente / Render React
	return (
		<div className="pagination-container">
			{
				pagArray.map((number, key) => {
					const active = pagination === number ? 'pagination-active' : '';
					return <button className={active} onClick={() => handleClick(number - 1)} key={`pagination-${key}`}>{number}</button>;
				})
			}
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default PaginationComponent;