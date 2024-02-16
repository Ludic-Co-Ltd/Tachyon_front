import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs(props) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box>
				<Tabs value={value} onChange={handleChange} aria-label="custom tab">
					{props.data.map((item) => (
						<Tab
							key={item.id}
							label={item.title}
							{...a11yProps(item.id - 1)}
						/>
					))}
				</Tabs>
			</Box>
			{props.data.map((item) =>
				<CustomTabPanel key={item.id} value={value} index={item.id - 1} aria-label="custom tab table">
					{item.content}
				</CustomTabPanel>)}
		</Box>
	);
}