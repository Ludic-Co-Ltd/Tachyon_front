import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function InputFileUpload(props) {

	const { name, label, handleChange, value, className } = props;

	return (
		<div className="mb-4">
			<label className={`block text-gray-700 text-sm font-bold mb-2 ${className}`} htmlFor={name}>
				{label}
			</label>
			<Button
				component="label"
				variant="contained"
				startIcon={<CloudUploadIcon />}
			>
				{value && value.length > 20 ? value.substr(0, 20) + '...' : value}
				<VisuallyHiddenInput type="file" onChange={handleChange} />
			</Button>
		</div>
	);
}