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
		const start = (pagination + 1) <= 3 ? 1 : (pagination - 1);
		const end = (pagination + 1) <= 3 ? 5 : pagination + 3;
		const arr = [];
		for (let i = start; i <= end; i++) { arr.push(i); };
		setPagArray(arr);
	}, [pagination]);

	// --------- Manejadores
	const handleClick = number => handleRequest({ search, offset:number, time:0 });

	// --------- Elementos del componente / Render React
	return (
		<div className="pagination-container">
			{
				pagArray.map((number, key) => {
					const active = (pagination + 1) === number ? 'pagination-active' : '';
					return <button className={active} onClick={() => handleClick(number - 1)} key={`pagination-${key}`}>{number}</button>;
				})
			}
		</div>
	);
};
//*! // -------- Exportando el componente -------------------------------------- */
export default PaginationComponent;