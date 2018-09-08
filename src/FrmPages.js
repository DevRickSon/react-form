import React from 'react';
import FrmContainer from './FrmContainer';

const FrmPages = ({match}) => {
	const {manufact, model, year, grade} = match.params;

	return (
		<FrmContainer
			passManufact={manufact}
			passModel={model}
			passYear={year}
			passGrade={grade}/>
	);
};

export default FrmPages;