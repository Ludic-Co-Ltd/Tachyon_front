import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function BasicRating(props) {

	const { name, label, handleChange, value, readOnly } = props;

	return (
		<div className="mb-1">
			<label className="block text-gray-700 text-sm font-bold" htmlFor={name}>
			{label}
	  	</label>
			<Rating
				name={name}
				value={parseFloat(value)}
				precision={0.5}
				readOnly={readOnly}
				onChange={(ev) => handleChange(name, ev.target.value)}
			/>
		</div>
	);
}