import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function DeleteButton(props) {
	
	const { handleClick, title, className, color } = props;
	
	return (
		<Stack direction="row" spacing={2} className={`m-0 ${className}`}>
			<Button color="warning" size="small" variant="outlined" onClick={handleClick}>
				{title?title:'削除'}
			</Button>
		</Stack>
	);
}