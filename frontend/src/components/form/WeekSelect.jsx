import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ja';

const WeekSelect = ({ selectedWeek,firstDate, lastDate, handleChange }) => {
	// const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

	// const handleWeekChange = (event) => {
	// 	setSelectedWeek(event.target.value);

	// };

	const getWeekNumberOfMonth = (date) => {
		const currentDate = moment(date);
		// const weekNumber = currentDate.isoWeek();
		const weekNumberOfMonth = Math.ceil((currentDate.date() + currentDate.startOf('month').add(-1, 'days').isoWeekday() - 1) / 7);
		return weekNumberOfMonth;
	};


	const generateWeekOptions = () => {
		const startDate = moment(firstDate, 'YYYY-MM-DD').startOf('isoWeek');
		const endDate = moment(lastDate, 'YYYY-MM-DD');
		// const startDate = moment('2022-01-01', 'YYYY-MM-DD');
		// const endDate = moment('2024-12-31', 'YYYY-MM-DD');
		const weekOptions = [];

		let currentDate = startDate;
		var i = 1;
		while (currentDate <= endDate) {
			const weekNumber1 = getWeekNumberOfMonth(currentDate);
			const weekNumber = currentDate.isoWeek();
			const weekLabel = `${currentDate.format('M')}月 第 ${weekNumber1} 週目 ( ${currentDate.format('YYYY年 M月 D日') } ~ ${currentDate.clone().add(6, 'days').format('YYYY年 M月 D日')} )`;
			const weekOption = (
				<option key={currentDate.format('YYYY-MM-DD')} value={currentDate.format('YYYY-MM-DD')}>
					{weekLabel}
				</option>
			);
			weekOptions.push(weekOption);
			currentDate.add(1, 'week');
			i++;
		}

		return weekOptions;
	};

	function getCurrentWeek() {
		const currentDate = moment();
		const currentWeek = currentDate.isoWeek();
		return currentWeek;
	};

	return (
		<div>
			{/* <label htmlFor="weekSelect">週を選択してください：</label> */}
			<select id="weekSelect" value={selectedWeek} onChange={(e)=>handleChange(e)}>
				{/* <option value="">-- 週を選択 --</option> */}
				{generateWeekOptions()}
			</select>
			{/* <p>選択された週：{selectedWeek}</p> */}
		</div>
	);
};

export default WeekSelect;
